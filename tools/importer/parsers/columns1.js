/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block
  const headerRow = ['Columns (columns1)'];

  // Find the left column: contains logos and text
  const leftSection = element.querySelector('.footer-brand__left');
  const leftCellContent = [];
  if (leftSection) {
    // ITC logo
    const itcLogo = leftSection.querySelector('.footer-brand__logo img');
    if (itcLogo) leftCellContent.push(itcLogo.cloneNode(true));
    // FSSAI logo
    const fssaiLogo = leftSection.querySelector('.footer-brand__secondary--logo img');
    if (fssaiLogo) leftCellContent.push(fssaiLogo.cloneNode(true));
  }

  // Compose left cell only from actual HTML content (images)
  const leftCell = document.createElement('div');
  leftCellContent.forEach((el) => leftCell.appendChild(el));

  // Find the right column: contains Terms of use and Privacy Policy
  const rightList = element.querySelector('.footer-brand__navbar--right .footerList ul');
  let rightCell;
  if (rightList) {
    rightCell = rightList.cloneNode(true);
  } else {
    rightCell = document.createElement('div');
  }

  // Build the table rows
  const rows = [
    headerRow,
    [leftCell, rightCell],
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
