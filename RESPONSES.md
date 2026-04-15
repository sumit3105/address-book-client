# API Response Models

All successful API responses from the Address Book Server are encapsulated within a generic `data` object to ensure a uniform response structure. Any error responses are encapsulated within an `errors` object.

## Standard Global Response Formats

### Successful Response Format
```json
{
  "data": {
    // Specific endpoint response payload
  }
}
```
_Note: If an endpoint returns no data, `"data": null` is returned._

### Error Response Format
```json
{
  "errors": {
    "message": "Human readable error description",
    "errorCode": "REQ0000X",
    "otherErrors": [
      "Detailed validation/system error 1",
      "Detailed validation/system error 2"
    ]
  }
}
```

---

## Validations and Date Types
- **UUIDs** are returned as standard strings (e.g. `"c1a2f646-993d-4c81-8bca-6e94bc172fb7"`).
- Empty or absent optional fields are often omitted if they fall under `omitempty` validation rules.

---

## Authentication Endpoints

### 1. Register User  (`POST /api/v3/auth/register`)
**Response:**
```json
{
  "data": {
    "id": "c1a2f646-993d-4c81-8bca-6e94bc172fb7",
    "email": "user@example.com"
  }
}
```

### 2. Login User (`POST /api/v3/auth/login`)
**Response:**
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## Address Management Endpoints

### The Reusable Address Model
Most address-related endpoints retrieve an `AddressResponse` object or a list of these objects.
```json
{
  "id": "3bd4de20-f5a8-444f-a968-3d12d4d38de0",
  "user_id": "c1a2f646-993d-4c81-8bca-6e94bc172fb7",
  "first_name": "Sumit",
  "last_name": "Gohil",
  "email": "sumit@example.com",
  "phone": "9876543210",
  "address_line1": "123 Main St",
  "address_line2": "Apt 4B",
  "city": "Mumbai",
  "state": "Maharashtra",
  "country": "India",
  "pincode": "400001"
}
```

### 3. Create Address (`POST /api/v3/addresses`)
**Response:**
```json
{
  "data": {
    // Single Address Model properties (as shown above)
  }
}
```

### 4. Get All Addresses (`GET /api/v3/addresses`)
**Response:**
```json
{
  "data": {
    "addresses": [
      {
        // Single Address Model properties
      },
      {
        // Single Address Model properties
      }
    ]
  }
}
```

### 5. Get Address By ID (`GET /api/v3/addresses/:id`)
**Response:**
```json
{
  "data": {
    // Single Address Model properties
  }
}
```

### 6. Update Address (`PUT /api/v3/addresses/:id`)
**Response:**
```json
{
  "data": {
    // Single Address Model properties representing the updated address
  }
}
```

### 7. Delete Address (`DELETE /api/v3/addresses/:id`)
**Response:**
```json
{
  "data": {
    "Message": "Success message here" 
  }
}
```
*__Note:__ The `Message` key is PascalCase in the JSON response because the struct field in Go lacks a lowercase JSON tag mapping.*

### 8. Export Addresses (`POST /api/v3/addresses/export`)
**Response:**
```json
{
  "data": {
    "Message": "Export process initiated successfully" 
  }
}
```
*__Note:__ The `Message` key is PascalCase in the JSON response because the struct field in Go lacks a lowercase JSON tag mapping.*

### 9. Filter/Search Addresses (`GET /api/v3/addresses/filter`)
**Response:**
```json
{
  "data": {
    "data": {
      "addresses": [
        {
          // Single Address Model properties
        }
      ]
    },
    "total": 42
  }
}
```
*__Note:__ Due to how the filter model nests the list response in Golang, the `addresses` array belongs to a nested `data` object. The `total` key indicates the total number of items out of pagination limits.*
