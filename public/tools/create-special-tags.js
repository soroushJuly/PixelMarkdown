import markdownit from 'markdown-it'
import markdownItConfig from './markdown-it-config';
// Initilize markdown instacne to render the nester mark downs
const md = markdownit(markdownItConfig);

// Replace the special markups with htmltags
const CreateSpecialTags = (input) => {
    for (const [key, value] of replacementMap) {
        input = input.replace(key, value)
    }
    return input
}

// List of special markups and their regex and html replacements
const specialMarkupList = {
    'video': { regularExpression: /\[video=([^\]]+)\]/g, replacement: '<video controls><source src=$1><></video>' },
    'image': { regularExpression: /\[img=([^\]]+)\]/g, replacement: '<img src=$1>' },
    'file': { regularExpression: /\[file=([^\]]+)\]/g, replacement: '<a href=$1 target="_blank">Link to file</a>' },
    'row': { regularExpression: /\[row\](.*?)\[\/row\]/g, replacement: '<div class="v-row w-100	">$1</div>' },
    'table': { regularExpression: /\[table\](.*?)\[\/table\]/g, replacement: '<div class="v-container">$1</div>' },
    '2-col-container': {
        regularExpression: /\[col-left\](.*?)\[\/col-left\]\[col-right\](.*?)\[\/col-right\]/g,
        replacement: (match, leftContent, rightContent) => `<div class="v-row w-100">
      <div class="v-col col-6">${md.render(leftContent.trim())}</div>
      <div class="v-col col-6">${md.render(rightContent.trim())}</div>
    </div>`
    },
    'col-left': { regularExpression: /\[col-left\](.*?)\[\/col-left\]/g, replacement: (match, content) => `<div class="v-col col-6">${md.render(content.trim())}</div>` },
    'col-right': { regularExpression: /\[col-right\](.*?)\[\/col-right\]/g, replacement: (match, content) => `<div class="v-col col-6">${md.render(content.trim())}</div>` },
}

const replacementMap = new Map();
for (const [key, value] of Object.entries(specialMarkupList)) {
    replacementMap.set(value.regularExpression, value.replacement)
}

export default CreateSpecialTags;