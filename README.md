README

MailerLite to Google Sheets Connector

This script enables seamless integration between MailerLite and Google Sheets, allowing you to fetch campaign data such as open rates, click-through rates, recipient counts, and more. The data is structured in a Google Sheet, making it ready for advanced visualization in BI tools like Looker Studio or any compatible software of your choice.

---

Features
- Automated Campaign Data Retrieval: Fetch statistics for sent campaigns directly from MailerLite.
- Google Sheets Integration: Update your Google Sheet with the latest campaign data.
- Customizable Fields: Retain and display only the parameters you need.
- Ready for BI Reporting: Easily connect your Google Sheet to Looker Studio or other platforms for detailed analysis.

---

Prerequisites
- A valid MailerLite API key.
- Access to a Google Sheet with Apps Script enabled.
- Basic knowledge of setting up and running Google Apps Script.

---

Usage Instructions
1. Configure the Script:
   - Replace `Add Api Key Here` with your MailerLite API key.
   - Replace `Add Google Spreadsheet Id Here` with your Google Sheet ID.
   - Replace `Add your Sheet Name` with the name of your sheet.

2. Run the Script:
   - Copy and paste the script into the Google Apps Script editor.
   - Run the `updateCampaignData()` function.

3. Connect to BI Tools (Optional):
   - Use the Google Sheet as a data source in tools like Looker Studio for advanced reporting.

---

License
This project is licensed under the MIT License. You are free to use, modify, and distribute this script as per the terms of the license.

---

Disclaimer
This script is provided "as is," without warranty of any kind, express or implied. Use it at your own risk. The developers are not responsible for any issues or data loss resulting from the use of this script. Ensure you have the necessary permissions and back up your data before running the script.
