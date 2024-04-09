// textEditor.js
import React from 'react';

const TextEditor = ({ insertText, target }) => {
  return (
    <div>
      <button type="button" className="editor_button" onClick={() => insertText('<strong> </strong>', target)}><strong>B</strong></button>
      <button type="button" className="editor_button" onClick={() => insertText('<i> </i>', target)}><i>I</i></button>
      <button type="button" className="editor_button" onClick={() => insertText('<u> </u>', target)}><u>U</u></button>
      <button type="button" className="editor_button" onClick={() => insertText('<h1></h1>', target)}><strong>H1</strong></button>
      <button type="button" className="editor_button" onClick={() => insertText('<p></p>', target)}><strong>P</strong></button>
      <button type="button" className="editor_button" onClick={() => insertText('<br>', target)}><strong>br</strong></button>
      <button type="button" className="editor_button" onClick={() => insertText('<span style="color: #FF0000;">Text</span>', target)}><strong>c</strong></button>
      <button type="button" className="editor_button" onClick={() => insertText('<a href="Link URL">Link Text</a>', target)}><strong>Link</strong></button>
      <button type="button" className="editor_button" onClick={() => insertText('<img src="Link URL" alt="Title">', target)}><strong>Image</strong></button>
      <button type="button" className="editor_button" onClick={() => insertText('<table class="recipe_table_main">\n\t<tr>\n\t\t<th>Header 1</th>\n\t\t<th>Header 2</th>\n\t</tr>\n\t<tr>\n\t\t<td>Data 1</td>\n\t\t<td>Data 2</td>\n\t</tr>\n</table>', target)}><strong>Table</strong></button>
      <button type="button" className="editor_button" onClick={() => insertText('<ul>\n\t<li>Item1</li>\n\t<li>Item2</li>\n</ul>', target)}><strong>•</strong></button>
      <button type="button" className="editor_button" onClick={() => insertText('<ol class="gradient-list steps">\n\t<li><span>Item1</span></li>\n\t<li><span>Item2</span></li>\n</ol>', target)}><strong>1</strong></button>
      <button type="button" className="editor_button" onClick={() => insertText('<div style="text-align: left;">Text</div>', target)}><strong>←</strong></button>
      <button type="button" className="editor_button" onClick={() => insertText('<div style="text-align: right;">Text</div>', target)}><strong>→</strong></button>
      <button type="button" className="editor_button" onClick={() => insertText('<div style="text-align: center;">Text</div>', target)}><strong>↔</strong></button>
      <button type="button" className="editor_button" onClick={() => insertText('<div style="text-align: justify;">Text</div>', target)}><strong>≡</strong></button>
    </div>
  );
};

export default TextEditor;
