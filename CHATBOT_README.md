# LogiHub Chatbot Feature Documentation

## Overview
The LogiHub chatbot is an AI-powered assistant that helps users with logistics inquiries. It features real-time AI responses via the LogiHub backend (`/api/ai/insight`), conversation tracking, and a chat-summary view.

## Features

### 1. Interactive Chatbot Widget
- **Location**: Fixed button in bottom-right corner of all pages
- **Toggle**: Click to open/close the chat window
- **Notification Badge**: Shows unread message count
- **Responsive**: Works on desktop and mobile devices

### 2. AI-Powered Responses
The chatbot uses two layers:

#### Layer 1: Google Gemini (Recommended)
- Served through `/api/ai/insight` (Vercel serverless function)
- **Why**: context-aware logistics responses and explainability (ETA/delay insights)
- **Performance**: outputs are cached in MongoDB (`AIInsight`) to reduce repeated Gemini calls

#### Layer 2: Contextual Fallback Responses
- Built-in responses for LogiHub-specific queries when Gemini is unavailable
- Topics covered:
  - Pricing and fare calculation
  - Booking shipments
  - Tracking orders
  - Truck types and specifications
  - Payment methods
  - Account management
  - Language support
  - General help and support

### 3. Conversation Tracking
Every chat session is tracked with:
- Unique session ID
- Timestamp (start and end)
- User information (name, email, role if logged in)
- Message count
- Topics discussed
- Full conversation history

### 4. Chat Summary Storage
Chat summaries are saved to multiple storage options:

#### Option 1: LocalStorage (Default - Active)
- Stores summaries in browser's localStorage
- Accessible via `admin.html` page
- No backend required
- Data persists in browser

#### Option 2: Firebase Firestore (Recommended for Production)
1. Create a Firebase project at https://firebase.google.com
2. Enable Firestore Database
3. Update `firebaseConfig` in script.js with your credentials:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT.appspot.com",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID"
   };
   ```
4. Add Firebase SDK to index.html:
   ```html
   <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-app-compat.js"></script>
   <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore-compat.js"></script>
   ```
5. Uncomment Firebase code in script.js and admin.html

#### Option 3: Custom Backend API
1. Create your own backend endpoint (Node.js, Python, etc.)
2. Uncomment the fetch API code in script.js
3. Update the endpoint URL
4. Implement your backend logic

### 5. Admin Dashboard
Access at: `admin.html`

**Features**:
- View all chat conversations
- Real-time statistics:
  - Total conversations
  - Total messages
  - Average messages per chat
  - Most common topics
- Filter by:
  - Search (user, topic, message content)
  - Topic categories
  - Date (newest/oldest)
  - Message count
- Expandable chat cards showing full conversation
- User information display
- Export capabilities (can be added)

## Installation & Setup

### Basic Setup (LocalStorage - No Configuration Needed)
1. Files are already configured
2. Open `index.html` in browser
3. Click the chatbot icon in bottom-right
4. Start chatting!
5. View conversations at `admin.html`

### Advanced Setup (Gemini + MongoDB)

#### Step 1: Configure environment variables
Create a `.env` locally (see `.env.example`):
- `MONGODB_URI` (MongoDB Atlas recommended)
- `JWT_SECRET` (long random string)
- `GEMINI_API_KEY` (Google Gemini API key)

#### Step 2: Run locally
Recommended for full-stack local development:
```bash
npm install
npx vercel dev
```

Static-only UI (no backend APIs):
```bash
npm run dev
```

#### Step 3: Deploy to Vercel
Set the same environment variables in Vercel Project Settings, then deploy.

### Firebase Setup (Optional but Recommended)

#### Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Follow setup wizard
4. Enable Firestore Database

#### Step 2: Get Configuration
1. Project Settings → General
2. Scroll to "Your apps"
3. Click Web icon (</>)
4. Copy the firebaseConfig object

#### Step 3: Update index.html
Add before closing `</body>` tag:
```html
<script src="https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore-compat.js"></script>
<script>
  const firebaseConfig = {
    // Your config here
  };
  firebase.initializeApp(firebaseConfig);
</script>
```

#### Step 4: Update script.js
Uncomment Firebase code (around line 822 and in admin.html)

#### Step 5: Set Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /chat_summaries/{document=**} {
      allow read, write: if true; // Or add authentication
    }
  }
}
```

## Usage

### For End Users
1. Click the blue chat icon in bottom-right corner
2. Type your question about LogiHub services
3. Press Enter or click Send button
4. Get instant AI responses
5. Continue conversation as needed

### For Admins
1. Navigate to `admin.html`
2. View all conversations in one place
3. Use filters to find specific chats
4. Click on any chat to expand full conversation
5. Monitor common topics and user inquiries

## Customization

### Styling
All chatbot styles are in `style.css` under "Chatbot Widget" section. Customize:
- Colors: Change `--primary`, `--gradient` variables
- Size: Modify `.chatbot-window` width/height
- Position: Adjust `bottom` and `right` values
- Animations: Edit keyframe animations

### Response Logic
Update contextual responses in `getContextualResponse()` function in script.js:
```javascript
if (lowerMessage.includes('your-keyword')) {
    return "Your custom response";
}
```

### Topics
Add new topics in `topicKeywords` object:
```javascript
const topicKeywords = {
    'YourTopic': ['keyword1', 'keyword2'],
    // ... existing topics
};
```

## API Integration Options

### Option 1: Hugging Face (Free Tier)
- **Pros**: Free, easy setup, good quality
- **Cons**: Rate limits, requires API key
- **Best for**: Small to medium traffic

### Option 2: OpenAI GPT
```javascript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer YOUR_OPENAI_KEY',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
    })
});
```

### Option 3: Google Gemini
```javascript
const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=YOUR_API_KEY`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }]
    })
});
```

### Option 4: Custom Backend
Create your own AI service for full control over data and responses.

## Security Considerations

1. **API Keys**: Never commit API keys to version control
   - Use environment variables
   - Store in Vercel environment settings

2. **Rate Limiting**: Implement rate limiting to prevent abuse
   ```javascript
   let messageCount = 0;
   const maxMessages = 50; // per session
   ```

3. **Input Validation**: Already implemented with `escapeHtml()`

4. **Authentication**: Add user authentication for admin page
   ```javascript
   // Add to admin.html
   const password = prompt('Enter admin password:');
   if (password !== 'your-secure-password') {
       window.location.href = 'index.html';
   }
   ```

## Troubleshooting

### Chatbot not appearing
- Check browser console for errors
- Ensure script.js is loaded
- Verify CSS is applied

### AI responses not working
- Check API key is correctly set
- Verify network connection
- Check browser console for errors
- Fallback responses should still work

### Chat summaries not saving
- Check localStorage is enabled
- Verify Firebase configuration (if using)
- Check browser console for errors

### Admin page showing no chats
- Test the chatbot first to create conversations
- Check localStorage data: `localStorage.getItem('logihub_chat_summaries')`
- Verify admin.html can access localStorage

## Performance Optimization

1. **Lazy Loading**: Chatbot only initializes when needed
2. **Message Batching**: Summaries saved periodically, not per message
3. **Efficient DOM Updates**: Uses innerHTML for batch updates
4. **Debouncing**: Search/filter functions can be debounced

## Future Enhancements

- [ ] Voice input/output
- [ ] File/image upload support
- [ ] Multi-language chatbot responses
- [ ] Sentiment analysis
- [ ] Auto-suggestions/quick replies
- [ ] Chat export to PDF/CSV
- [ ] Email notifications for admin
- [ ] Analytics dashboard
- [ ] Integration with CRM systems
- [ ] Chatbot personality customization

## Support

For issues or questions:
1. Check browser console for errors
2. Review this documentation
3. Contact LogiHub support team

## License

Part of the LogiHub project. All rights reserved.
