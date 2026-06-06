const mammoth = require('mammoth');
const sharp = require('sharp');

const PAGE_WIDTH = 1240;
const PAGE_HEIGHT = 1754;
const MARGIN = 80;
const LINE_HEIGHT = 38;
const FONT_SIZE = 30;
const MAX_CHARS_PER_LINE = 62;

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const wrapLine = (line) => {
  if (!line.trim()) {
    return [''];
  }

  const words = line.split(/\s+/);
  const output = [];
  let current = words.shift() || '';

  words.forEach((word) => {
    const candidate = `${current} ${word}`;
    if (candidate.length <= MAX_CHARS_PER_LINE) {
      current = candidate;
      return;
    }

    output.push(current);
    current = word;
  });

  output.push(current);
  return output;
};

const paginateText = (text) => {
  const lines = text
    .split(/\r?\n/)
    .flatMap((line) => wrapLine(line));

  const maxLinesPerPage = Math.floor((PAGE_HEIGHT - MARGIN * 2) / LINE_HEIGHT);
  const pages = [];

  for (let i = 0; i < lines.length; i += maxLinesPerPage) {
    pages.push(lines.slice(i, i + maxLinesPerPage));
  }

  return pages.length ? pages : [['No readable text found in document.']];
};

const renderPageToJpg = async (pageLines) => {
  const textElements = pageLines
    .map(
      (line, index) =>
        `<tspan x="${MARGIN}" dy="${index === 0 ? 0 : LINE_HEIGHT}">${escapeXml(line)}</tspan>`
    )
    .join('');

  const svg = `<svg width="${PAGE_WIDTH}" height="${PAGE_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#ffffff" />
    <text x="${MARGIN}" y="${MARGIN + FONT_SIZE}" font-family="Arial, Helvetica, sans-serif" font-size="${FONT_SIZE}" fill="#111827">${textElements}</text>
  </svg>`;

  return sharp(Buffer.from(svg))
    .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
    .toBuffer();
};

const convertWordBufferToJpg = async (buffer) => {
  const { value } = await mammoth.extractRawText({ buffer });
  const text = (value || '').trim();
  const pages = paginateText(text);

  const images = await Promise.all(
    pages.map(async (pageLines, index) => {
      const jpgBuffer = await renderPageToJpg(pageLines);
      return {
        page: index + 1,
        dataUrl: `data:image/jpeg;base64,${jpgBuffer.toString('base64')}`,
      };
    })
  );

  return images;
};

module.exports = {
  convertWordBufferToJpg,
};
