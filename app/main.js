import { marked } from "marked";

const GUIDE = `
### Format Text Guide untuk WhatsApp

**1. Bold:**
   Untuk membuat teks menjadi **bold**, gunakan tanda bintang dua kali di depan dan di belakang teks.
   - Contoh: \`*Teks Bold*\` akan menjadi **Teks Bold**

**2. Italic:**
   Untuk membuat teks menjadi *italic*, gunakan tanda garis bawah satu kali di depan dan di belakang teks.
   - Contoh: \`_Teks Italic_\` akan menjadi *Teks Italic*

**3. Bold Italic:**
   Untuk membuat teks menjadi **_bold italic_**, gunakan tanda bintang dua kali dan garis bawah satu kali di depan dan di belakang teks.
   - Contoh: \`*_Teks Bold Italic_*\` akan menjadi **_Teks Bold Italic_**

**4. Strikethrough:**
   Untuk membuat teks dicoret (strikethrough), gunakan tanda tilde (~) di depan dan di belakang teks.
   - Contoh: \`~Teks Strikethrough~\` akan menjadi ~Teks Strikethrough~

**5. Monospace:**
   Untuk membuat teks dengan monospace (font tetap), gunakan tanda backtick (\` \`) di depan dan di belakang teks.
   - Contoh: \`\` \`Teks Monospace\` \`\` akan menjadi \`Teks Monospace\`
`;
const EXAMPLE_RESULT = `
Yth. Bapak/Ibu Rahmat,

Saya harap Bapak/Ibu dalam keadaan sehat. Saya, **Andi** dari _PT Sukses Makmur_, ingin mengatur pertemuan untuk membahas *peluang kerjasama*. Mohon kesediaannya untuk menentukan waktu yang cocok.

Terima kasih.

Salam,
_Andi_
`

const EXAMPLE_MESSAGE = `
Yth. Bapak/Ibu Rahmat,

Saya harap Bapak/Ibu dalam keadaan sehat. Saya, \`*Andi*\` dari \`_PT Sukses Makmur_\`, ingin mengatur pertemuan untuk membahas \`_peluang kerjasama_\`. Mohon kesediaannya untuk menentukan waktu yang cocok.

Terima kasih.

Salam,
\`_Andi_\`
`

document.getElementById('example-message').innerHTML = marked(EXAMPLE_MESSAGE);
document.getElementById('example-result').innerHTML = marked(EXAMPLE_RESULT);
document.getElementById('guide').innerHTML = marked(GUIDE);

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

function generateUrl(number, message) {
  if (!number || !message) {
    Toast.fire({
      icon: 'error',
      title: 'Please enter both number and message!'
    })
    return
  }
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`
  Toast.fire({
    icon: 'success',
    title: 'URL generated successfully!'
  })
  return url
}

function copyToClipboard(text) {
  // Buat elemen textarea sementara
  var textarea = document.createElement('textarea');
  textarea.value = text;
  
  // Styling untuk memastikan elemen ini tidak terlihat
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  
  // Menambahkan elemen ke dalam dokumen
  document.body.appendChild(textarea);
  
  // Memilih teks di dalam textarea
  textarea.select();
  
  try {
    // Menyalin teks yang telah dipilih
    var successful = document.execCommand('copy');
    if (successful) {
      Toast.fire({
        icon: 'success',
        title: 'Text copied to clipboard!'
      })
    }
  } catch (err) {
    Toast.fire({
      icon: 'error',
      title: 'Failed to copy text to clipboard!'
    })
  } finally {
    // Menghilangkan elemen textarea
    document.body.removeChild(textarea);
  }
  
  // Menghapus textarea yang tidak terlihat
  document.body.removeChild(textarea);
}


document.getElementById('generate').addEventListener('click', () => {
  const number = document.getElementById('number').value
  const message = document.getElementById('message').value
  const url = generateUrl(number, message)
  if (!url) return
  document.getElementById('result').textContent = url
  document.getElementById('copy').addEventListener('click', () => copyToClipboard(url))
})
