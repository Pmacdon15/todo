// Retrieve the cookie value by its name (e.g., "userToken")
function getCookieValue(cookieName) {
    console.log(document.cookie);

}
  
  // Load the content of the "userToken" cookie into the authToken variable
  const authToken = getCookieValue('userToken');
  
  if (authToken) {
    console.log('Token:', authToken);
//     // You can use authToken for further processing, such as making authenticated API requests
  } //else {
//     console.log('Token not found.');
//   }