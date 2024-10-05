function generateLink() {
    const targetUrl = document.getElementById('targetUrl').value;

    if (!targetUrl) {
        alert('Please enter a valid URL');
        return;
    }

    // Generate a unique redirect link
    const redirectLink = `https://yourusername.github.io/your-repo-name/redirect.html?url=${encodeURIComponent(targetUrl)}`;
    
    // Display the generated link
    document.getElementById('output').innerHTML = `
        <p>Copy and send this link:</p>
        <input type="text" value="${redirectLink}" readonly>
        <button onclick="copyLink('${redirectLink}')">Copy Link</button>
    `;
}

function copyLink(link) {
    navigator.clipboard.writeText(link)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
}
