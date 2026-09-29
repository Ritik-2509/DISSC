const http = require('http');

async function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, headers: res.headers, data: parsed, raw: body });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, raw: body });
        }
      });
    });

    req.on('error', reject);

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log("=== Testing DISCC Next.js API Endpoints ===\n");
  const results = [];

  // Test 1: GET /api/contact
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/contact',
      method: 'GET'
    });
    console.log("1. GET /api/contact -> Status:", res.status, res.data);
    results.push({ test: "GET /api/contact", pass: res.status === 200 && res.data?.status === 'ok' });
  } catch (e) {
    console.error("1. GET /api/contact FAILED:", e.message);
    results.push({ test: "GET /api/contact", pass: false, error: e.message });
  }

  // Test 2: POST /api/contact (validation error on empty)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/contact',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {});
    console.log("2. POST /api/contact (empty payload) -> Status:", res.status, res.data);
    results.push({ test: "POST /api/contact validation", pass: res.status === 400 });
  } catch (e) {
    console.error("2. POST /api/contact validation FAILED:", e.message);
    results.push({ test: "POST /api/contact validation", pass: false, error: e.message });
  }

  // Test 3: POST /api/contact (valid)
  let createdContactId = null;
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/contact',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: "Test Donor API Check",
      email: "test.donor@discc.org",
      phone: "9876543210",
      subject: "Automated API Test Inquiry",
      message: "Testing system resilience and response"
    });
    console.log("3. POST /api/contact (valid payload) -> Status:", res.status, res.data);
    createdContactId = res.data?.id;
    results.push({ test: "POST /api/contact (valid)", pass: res.status === 200 && res.data?.success === true });
  } catch (e) {
    console.error("3. POST /api/contact (valid) FAILED:", e.message);
    results.push({ test: "POST /api/contact (valid)", pass: false, error: e.message });
  }

  // Test 4: GET /api/contacts collection
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/contacts',
      method: 'GET'
    });
    const count = Array.isArray(res.data) ? res.data.length : 'not array';
    console.log("4. GET /api/contacts -> Status:", res.status, "Count:", count);
    results.push({ test: "GET /api/contacts", pass: res.status === 200 && Array.isArray(res.data) });
  } catch (e) {
    console.error("4. GET /api/contacts FAILED:", e.message);
    results.push({ test: "GET /api/contacts", pass: false, error: e.message });
  }

  // Test 5: GET /api/galleries collection
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/galleries',
      method: 'GET'
    });
    const count = Array.isArray(res.data) ? res.data.length : 'not array';
    console.log("5. GET /api/galleries -> Status:", res.status, "Count:", count);
    results.push({ test: "GET /api/galleries", pass: res.status === 200 && Array.isArray(res.data) });
  } catch (e) {
    console.error("5. GET /api/galleries FAILED:", e.message);
    results.push({ test: "GET /api/galleries", pass: false, error: e.message });
  }

  // Test 6: GET /api/settings collection
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/settings',
      method: 'GET'
    });
    console.log("6. GET /api/settings -> Status:", res.status, "IsArray:", Array.isArray(res.data));
    results.push({ test: "GET /api/settings", pass: res.status === 200 });
  } catch (e) {
    console.error("6. GET /api/settings FAILED:", e.message);
    results.push({ test: "GET /api/settings", pass: false, error: e.message });
  }

  // Test 7: GET /api/blogs collection
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/blogs',
      method: 'GET'
    });
    console.log("7. GET /api/blogs -> Status:", res.status, "Count:", Array.isArray(res.data) ? res.data.length : 0);
    results.push({ test: "GET /api/blogs", pass: res.status === 200 && Array.isArray(res.data) });
  } catch (e) {
    console.error("7. GET /api/blogs FAILED:", e.message);
    results.push({ test: "GET /api/blogs", pass: false, error: e.message });
  }

  // Test 8: POST /api/contacts (create doc via collection route)
  let dynamicDocId = Date.now();
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/contacts',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      id: dynamicDocId,
      name: "API Test Doc",
      email: "api.test@discc.org",
      phone: "1234567890",
      subject: "Test Subject",
      content: "Test Content"
    });
    console.log("8. POST /api/contacts -> Status:", res.status, res.data?.id);
    results.push({ test: "POST /api/contacts", pass: res.status === 201 });
  } catch (e) {
    console.error("8. POST /api/contacts FAILED:", e.message);
    results.push({ test: "POST /api/contacts", pass: false, error: e.message });
  }

  // Test 9: PUT /api/contacts (update doc)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/contacts',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    }, {
      id: dynamicDocId,
      name: "API Test Doc UPDATED",
      status: "reviewed"
    });
    console.log("9. PUT /api/contacts -> Status:", res.status, res.data);
    results.push({ test: "PUT /api/contacts", pass: res.status === 200 && res.data?.success === true });
  } catch (e) {
    console.error("9. PUT /api/contacts FAILED:", e.message);
    results.push({ test: "PUT /api/contacts", pass: false, error: e.message });
  }

  // Test 10: DELETE /api/contacts?id=... (delete doc)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/contacts?id=${dynamicDocId}`,
      method: 'DELETE'
    });
    console.log("10. DELETE /api/contacts?id=... -> Status:", res.status, res.data);
    results.push({ test: "DELETE /api/contacts?id=...", pass: res.status === 200 && res.data?.success === true });
  } catch (e) {
    console.error("10. DELETE /api/contacts FAILED:", e.message);
    results.push({ test: "DELETE /api/contacts?id=...", pass: false, error: e.message });
  }

  // Test 11: GET /api/contacts/[id]
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/contacts/nonexistent_id_999`,
      method: 'GET'
    });
    console.log("11. GET /api/contacts/[id] -> Status:", res.status, res.data);
    results.push({ test: "GET /api/contacts/[id]", pass: res.status === 404 || res.status === 200 });
  } catch (e) {
    console.error("11. GET /api/contacts/[id] FAILED:", e.message);
    results.push({ test: "GET /api/contacts/[id]", pass: false, error: e.message });
  }

  // Test 12: POST /api/cloudinary/upload (missing payload check)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/cloudinary/upload',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {});
    console.log("12. POST /api/cloudinary/upload (empty body check) -> Status:", res.status, res.data);
    results.push({ test: "POST /api/cloudinary/upload validation", pass: res.status === 400 || res.status === 503 });
  } catch (e) {
    console.error("12. POST /api/cloudinary/upload FAILED:", e.message);
    results.push({ test: "POST /api/cloudinary/upload", pass: false, error: e.message });
  }

  console.log("\n=== Test Results Summary ===");
  const passed = results.filter(r => r.pass).length;
  console.log(`Passed: ${passed}/${results.length}`);
  results.forEach(r => console.log(`  ${r.pass ? '[PASS]' : '[FAIL]'} ${r.test} ${r.error ? '(' + r.error + ')' : ''}`));
}

runTests().catch(console.error);
