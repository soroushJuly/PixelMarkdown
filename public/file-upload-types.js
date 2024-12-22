const fileUploadTypes = [
    { name: 'image', inputFromat: 'image/*', markup: url => `\n[img="${url}"]` },
    { name: 'video', inputFromat: '', markup: url => `\n[video="${url}"]` },
    { name: 'file', inputFromat: '', markup: url => `\n[file="${url}"]` },
]

export default fileUploadTypes