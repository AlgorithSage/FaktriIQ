import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:url_launcher/url_launcher.dart';

/// Phone authentication for desktop platforms (Windows/Linux/macOS).
///
/// Since Firebase Auth's `verifyPhoneNumber()` requires native mobile
/// platform channels (Play Services on Android, APNs on iOS), it cannot
/// work on desktop. Instead we:
///
///   1. Spin up a one-shot local HTTP server on a random port.
///   2. Open the browser to a hosted login page that uses the Firebase
///      **Web SDK** (which supports reCAPTCHA-based phone verification).
///   3. After the user verifies their OTP in the browser, the web page
///      redirects to `http://127.0.0.1:<port>/auth-callback?token=<ID_TOKEN>`.
///   4. The local server captures the token and returns it to the caller.
///   5. The caller exchanges the raw ID token for a Firebase credential
///      via `signInWithCustomToken` or by directly using the ID token.
class DesktopPhoneAuthService {
  /// The base URL where the login.html page is hosted.
  /// In development this is the local Vite dev server.
  /// In production this should be the deployed landing page domain.
  static const String _loginPageBaseUrl = 'http://localhost:5173';

  /// Starts the browser-based phone auth flow and returns a Firebase ID token.
  ///
  /// Throws [TimeoutException] if the user does not complete login within 5 min.
  /// Throws [Exception] on cancellation or errors.
  static Future<String> signIn() async {
    final server = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
    final port = server.port;

    try {
      // Open the login page in the default browser, passing the callback port
      final loginUri = Uri.parse(
        '$_loginPageBaseUrl/login.html?port=$port',
      );

      final launched = await launchUrl(
        loginUri,
        mode: LaunchMode.externalApplication,
      );
      if (!launched) {
        throw Exception('Could not open the system browser for phone login.');
      }

      // Wait for the browser to redirect back with the token
      final request = await server.first.timeout(
        const Duration(minutes: 5),
        onTimeout: () =>
            throw TimeoutException('Phone sign-in timed out. Please try again.'),
      );

      final params = request.uri.queryParameters;
      final token = params['token'];
      final error = params['error'];

      // Respond to the browser with a success/failure page
      request.response
        ..statusCode = 200
        ..headers.contentType = ContentType.html
        ..write(_responseHtml(success: token != null && error == null));
      await request.response.close();

      if (error != null) {
        throw Exception('Phone sign-in failed: $error');
      }
      if (token == null || token.isEmpty) {
        throw Exception('No authentication token received.');
      }

      return token;
    } finally {
      unawaited(server.close(force: true));
    }
  }

  static String _responseHtml({required bool success}) {
    final message = success
        ? 'Phone login successful — you can close this tab and return to FaktriIQ.'
        : 'Phone login failed — please close this tab and try again in the app.';
    return '''
<!DOCTYPE html>
<html>
  <head>
    <title>FaktriIQ</title>
    <style>
      body {
        font-family: 'Inter', -apple-system, system-ui, sans-serif;
        background: #0a0a0f;
        color: #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        margin: 0;
      }
      .card {
        background: rgba(15, 23, 42, 0.85);
        border: 1px solid rgba(51, 65, 85, 0.6);
        border-radius: 20px;
        padding: 40px 32px;
        text-align: center;
        max-width: 400px;
      }
      h2 { margin: 0 0 8px; font-size: 20px; font-weight: 700; }
      p { color: #64748b; font-size: 13px; margin: 0; }
      .icon {
        font-size: 36px;
        margin-bottom: 16px;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="icon">${success ? '✓' : '✗'}</div>
      <h2>${success ? 'Authenticated!' : 'Login Failed'}</h2>
      <p>$message</p>
    </div>
  </body>
</html>
''';
  }
}
