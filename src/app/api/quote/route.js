import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // The Google Apps Script Web App URL
    // Make sure to add GOOGLE_SHEETS_URL to your .env.local file!
    const scriptUrl = process.env.GOOGLE_SHEETS_URL;

    if (scriptUrl) {
      // Forward the data to Google Sheets CRM
      await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } else {
      // Fallback for development if URL is not yet provided in .env
      console.log('No GOOGLE_SHEETS_URL found in .env.local. Simulating save:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    return NextResponse.json(
      { message: 'Request submitted successfully!', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to process request:', error);
    return NextResponse.json(
      { message: 'Failed to process request.', success: false },
      { status: 500 }
    );
  }
}
