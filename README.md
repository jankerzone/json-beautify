# JSON Beautifier & Minifier

A beautiful, user-friendly web application for formatting, minifying, and converting JSON data. The application provides real-time syntax highlighting, multiple export options, and an intuitive interface to work with JSON data efficiently.

## Features

- **JSON Beautification**: Format JSON with proper indentation for readability
- **JSON Minification**: Compress JSON by removing unnecessary whitespace
- **Syntax Highlighting**: Real-time syntax highlighting for better readability
- **Export Options**: Download as JSON, CSV, or XLSX formats
- **Copy to Clipboard**: Easily copy formatted JSON to your clipboard
- **Clear Functionality**: One-click clearing of input and output
- **Responsive Design**: Works seamlessly across all device sizes
- **Dark Mode Support**: Automatic dark/light mode based on system preference

## Technologies Used

- **React** - Frontend library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool for fast development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable UI components
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Icon library
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Sonner** - Toast notifications
- **xlsx** - Excel file processing
- **React Hook Form** - Form management

## Installation

1. **Clone the repository** (if applicable) or download the source code
2. **Install dependencies** using pnpm:
   ```bash
   pnpm install
   ```
   
   If you don't have pnpm installed, you can install it globally:
   ```bash
   npm install -g pnpm
   ```

3. **Start the development server**:
   ```bash
   pnpm dev
   ```

4. **Open your browser** and navigate to `http://localhost:8080`

## Usage

1. **Paste your JSON** into the input text area on the left
2. **Click "Per-cantik JSON"** to format/beautify your JSON with proper indentation
3. **Click "Minify JSON"** to compress your JSON by removing whitespace
4. **View the output** in the right panel with syntax highlighting
5. **Use the dropdown menu** to download the JSON in various formats:
   - JSON: Save as beautified/minified JSON file
   - CSV: Convert JSON array to CSV format (requires array of objects)
   - XLSX: Convert JSON array to Excel format (requires array of objects)
6. **Copy to clipboard** using the copy button next to the output title
7. **Clear input/output** using the "Bersihkan" (Clear) button

## Development

This project uses the following commands for development:

- `pnpm dev` - Start the development server with hot reloading
- `pnpm build` - Create a production build
- `pnpm build:dev` - Create a development build
- `pnpm lint` - Lint the codebase
- `pnpm preview` - Preview the production build locally

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   └── JsonSyntaxHighlighter.tsx # Syntax highlighting component
├── pages/               # Page components
│   └── JsonBeautifier.tsx # Main JSON beautifier page
├── utils/               # Utility functions
│   └── toast.ts         # Notification utilities
├── hooks/               # Custom React hooks
├── lib/                 # Library utilities
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── globals.css          # Global styles
```

## Browser Compatibility

The application works in all modern browsers including Chrome, Firefox, Safari, and Edge.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please file an issue on the repository.