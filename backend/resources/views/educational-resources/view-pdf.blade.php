<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $resource->title }} - PDF Viewer</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        html, body {
            height: 100%;
            overflow: hidden;
        }
        .pdf-container {
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .pdf-header {
            padding: 1rem;
            background: #1a1a2e;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .pdf-header h1 {
            font-size: 1.25rem;
        }
        .pdf-header a {
            color: #4ade80;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border: 1px solid #4ade80;
            border-radius: 0.375rem;
            transition: all 0.2s;
        }
        .pdf-header a:hover {
            background: #4ade80;
            color: #1a1a2e;
        }
        .pdf-viewer {
            flex: 1;
            width: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <div class="pdf-container">
        <div class="pdf-header">
            <h1>{{ $resource->title }}</h1>
            <a href="{{ url()->previous() }}">&larr; Back</a>
        </div>
        <iframe
            src="{{ $resource->file_url }}"
            class="pdf-viewer"
            frameborder="0"
        ></iframe>
    </div>
</body>
</html>
