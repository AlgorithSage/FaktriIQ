import 'package:flutter_test/flutter_test.dart';
import 'package:faktriiq/main.dart';

void main() {
  testWidgets('FaktriIQ Smoke Test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const FaktriApp());

    // Verify that the title FaktriIQ is rendered in the app bar.
    expect(find.textContaining('FaktriIQ'), findsAtLeast(1));
  });
}
