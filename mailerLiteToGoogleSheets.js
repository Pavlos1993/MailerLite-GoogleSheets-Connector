function updateCampaignData() {
  const apiKey = 'Add Api key Here'; // Replace with your MailerLite API key
  const baseURL = 'https://connect.mailerlite.com/api/';
  const status = 'sent'; // Filter campaigns by status (e.g., 'sent')
  const campaignsEndpoint = `campaigns?filter[status]=${status}`;
  const spreadsheetId = 'Add Google Speadsheet Id Here'; // Replace with your Google Spreadsheet ID
  const sheetName = 'Add your Sheet Name'; // Replace with your sheet's name

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${apiKey}` // Add the API key as a bearer token
    },
    muteHttpExceptions: true // Allow the script to continue on HTTP errors
  };

  // Function to fetch campaign data from MailerLite API
  const fetchCampaignData = () => {
    const url = `${baseURL}${campaignsEndpoint}`;
    const response = UrlFetchApp.fetch(url, options);

    // Check if the response status is not 200 and handle errors
    if (response.getResponseCode() !== 200) {
      throw new Error(`Failed to fetch ${status} campaigns. Status code: ${response.getResponseCode()}`);
    }

    return JSON.parse(response.getContentText()).data; // Parse and return the API response data
  };

  // Function to update the Google Spreadsheet with campaign data
  const updateSpreadsheet = () => {
    const campaignData = fetchCampaignData();
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(sheetName);

    // Clear existing data in the sheet to avoid appending duplicate data
    sheet.clear();

    // Define the parameters (fields) to retain from the API response
    const parametersToKeep = [
      { key: 'id', name: 'id' },
      { key: 'name', name: 'Name' },
      { key: 'type', name: 'Type' },
      { key: 'status', name: 'Status' },
      { key: 'delivery_schedule', name: 'Delivery Schedule' },
      { key: 'finished_at', name: 'Sent' },
      { key: 'type_for_humans', name: 'Type For Humans' },
      { key: 'stats.sent', name: 'Recipients' },
      { key: 'stats.unique_opens_count', name: 'Unique Opens' },
      { key: 'stats.open_rate.string', name: 'Open Rate%' },
      { key: 'stats.unique_clicks_count', name: 'Unique Clicks' },
      { key: 'stats.click_rate.string', name: 'Unique Clicks Rate %' },
      { key: 'stats.unsubscribes_count', name: 'Unsubscribes' },
      { key: 'stats.unsubscribe_rate.string', name: 'Unsubscribes Rate %' },
      { key: 'stats.spam_rate.string', name: 'Spam Rate %' },
      { key: 'stats.hard_bounces_count', name: 'Hard Bounces' },
      { key: 'stats.hard_bounce_rate.string', name: 'Hard Bounces Rate %' },
      { key: 'stats.soft_bounces_count', name: 'Soft Bounces' },
      { key: 'stats.soft_bounce_rate.string', name: 'Soft Bounces Rate %' },
      { key: 'stats.click_to_open_rate.string', name: 'CTOR %' }
    ];

    // Set the column headers in the spreadsheet
    const headers = parametersToKeep.map(param => param.name);

    // Map the campaign data into rows based on the selected parameters
    const rows = campaignData.map(campaign => {
      return parametersToKeep.map(param => {
        const value = getValueFromParameter(campaign, param.key);
        return value !== undefined ? value : '';
      });
    });

    // Update the spreadsheet with the headers and rows
    sheet.getRange(1, 1, rows.length + 1, headers.length).setValues([headers, ...rows]);

    Logger.log(`${status} campaign data has been successfully fetched and updated in the spreadsheet.`);
  };

  // Helper function to retrieve nested values from an object
  const getValueFromParameter = (object, parameter) => {
    const keys = parameter.split('.');
    return keys.reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : undefined, object);
  };

  // Error handling to catch and log any issues
  try {
    updateSpreadsheet();
  } catch (error) {
    console.error(`Error updating spreadsheet: ${error}`);
  }
}
