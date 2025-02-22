import WebViewScreen from "@/components/ui/WebViewScreen";

const privacyPolicyHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            padding-top: 60px;
        }
        h1 { color: #2196F3; margin-bottom: 30px; }
        h2 { color: #1976D2; margin-top: 30px; }
        p { margin-bottom: 15px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 10px; }
    </style>
</head>
<body>
    <h1>Privacy Policy</h1>
    <p>Last updated: ${new Date().toLocaleDateString()}</p>

    <p>Appstronauts ("we," "our," or "us") operates the boote mobile application (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.</p>

    <h2>Information Collection and Use</h2>
    <p>We collect several different types of information for various purposes to provide and improve our Service to you:</p>
    <ul>
        <li><strong>Task Data:</strong> Information about your cleaning tasks, schedules, and room configurations</li>
        <li><strong>Usage Data:</strong> Information about how you use and interact with the app</li>
        <li><strong>Device Information:</strong> Basic information about your mobile device</li>
    </ul>

    <h2>Data Storage</h2>
    <p>Your task data is primarily stored locally on your device. We use secure storage methods to protect your information.</p>

    <h2>Analytics</h2>
    <p>We use analytics services to understand how our users interact with the app, which helps us improve the user experience. This data is anonymized and cannot be used to identify individual users.</p>

    <h2>Your Rights</h2>
    <p>You have the right to:</p>
    <ul>
        <li>Access your personal data</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Export your data</li>
    </ul>

    <h2>Children's Privacy</h2>
    <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.</p>

    <h2>Changes to This Privacy Policy</h2>
    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>

    <h2>Contact Us</h2>
    <p>If you have any questions about this Privacy Policy, please contact us:</p>
    <ul>
        <li>By email: support@appstronauts.com</li>
        <li>By visiting our website: www.appstronauts.com</li>
    </ul>
</body>
</html>
`;

export default function PrivacyPolicyScreen() {
  return <WebViewScreen html={privacyPolicyHtml} />;
}
