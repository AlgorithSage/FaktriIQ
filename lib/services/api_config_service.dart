import 'dart:convert';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:path_provider/path_provider.dart';
import '../main.dart' show kApiBaseUrl;

/// Resolves the backend base URL, layered by priority:
/// 1. A user-set override, persisted locally (editable at runtime, no rebuild needed).
/// 2. On desktop (Windows/Linux/macOS): `127.0.0.1:8000`, since the backend
///    typically runs on the same machine as the desktop client.
/// 3. Otherwise: [kApiBaseUrl] (the existing mobile compile-time default).
class ApiConfigService {
  static final ApiConfigService _instance = ApiConfigService._internal();
  factory ApiConfigService() => _instance;
  ApiConfigService._internal();

  String? _override;
  bool _isInitialized = false;

  bool get _isDesktop =>
      !kIsWeb &&
      (defaultTargetPlatform == TargetPlatform.windows ||
          defaultTargetPlatform == TargetPlatform.linux ||
          defaultTargetPlatform == TargetPlatform.macOS);

  String get _platformDefault => _isDesktop ? "http://127.0.0.1:8000" : kApiBaseUrl;

  Future<File> _getConfigFile() async {
    final dir = await getApplicationDocumentsDirectory();
    return File('${dir.path}/api_config.json');
  }

  Future<void> init() async {
    if (_isInitialized) return;
    try {
      final file = await _getConfigFile();
      if (await file.exists()) {
        final content = await file.readAsString();
        final Map<String, dynamic> json = jsonDecode(content);
        _override = json['baseUrl'] as String?;
      }
    } catch (_) {}
    _isInitialized = true;
  }

  Future<String> getBaseUrl() async {
    await init();
    final override = _override;
    if (override != null && override.trim().isNotEmpty) return override.trim();
    return _platformDefault;
  }

  Future<void> setBaseUrl(String url) async {
    await init();
    _override = url.trim();
    try {
      final file = await _getConfigFile();
      await file.writeAsString(jsonEncode({'baseUrl': _override}));
    } catch (_) {}
  }

  Future<void> resetToDefault() async {
    await init();
    _override = null;
    try {
      final file = await _getConfigFile();
      if (await file.exists()) await file.delete();
    } catch (_) {}
  }
}
