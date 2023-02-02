# Mute Profanity API

## How to Run
To run the API, you will need to have Node.js installed. Once you have Node.js installed, you can run the following commands to start the API:

```bash
git clone https://github.com/ezedinff/profanity-filter-api.git
cd profanity-filter-api
npm install

# run docker-compose
docker-compose up
```

## Endpoint
The API has a single endpoint at /mute-profanity which accepts multipart form data.

Request Body
The audio file is expected in the request body as a field named audioFile. The field should contain the audio file in .mp3 format.

Example Request
Here is an example of what the request body might look like when making a request to the /mute-profanity endpoint:

```bash
curl -X POST \
  http://localhost:3000/mute-profanity \
  -H 'Content-Type: multipart/form-data' \
  -F audioFile=@/path/to/audio.mp3
```

## Response
The response will be a JSON object with the following structure:

```json
{
    "message": "Profanity removed from audio file",
    "path": "/path/to/muted_audio.wav"
}
```

## Error Responses
If there is an error processing the audio file, the response will be a JSON object with the following structure:

```json
{
    "error": "Error message"
}
```