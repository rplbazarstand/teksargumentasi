const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$('#theme').onclick=()=>{document.body.classList.toggle('dark');$('#theme').textContent=document.body.classList.contains('dark')?'☀':'☾'};
$('#menu').onclick=()=>$('#links').classList.toggle('open');
$$('#links a').forEach(a=>a.onclick=()=>$('#links').classList.remove('open'));
$('#search').addEventListener('input',e=>{let q=e.target.value.toLowerCase();$$('.chapter').forEach(c=>c.style.display=c.innerText.toLowerCase().includes(q)?'block':'none')});
window.addEventListener('scroll',()=>{$('#up').style.display=scrollY>400?'block':'none'});$('#up').onclick=()=>scrollTo({top:0,behavior:'smooth'});
const Q=[
['Apa tujuan utama teks argumentasi?',['Menghibur','Meyakinkan dengan alasan dan bukti','Menggambarkan objek','Menceritakan pengalaman'],1,'Argumentasi bertujuan meyakinkan pembaca dengan pendapat yang didukung alasan dan bukti.'],
['Pendapat utama penulis disebut ...',['Orientasi','Resolusi','Tesis','Koda'],2,'Tesis adalah pernyataan pendapat utama yang menjadi dasar argumentasi.'],
['Paragraf dengan kalimat utama di akhir disebut ...',['Deduktif','Induktif','Campuran','Deskriptif'],1,'Paragraf induktif bergerak dari penjelasan khusus menuju simpulan umum.'],
['Manakah kalimat fakta?',['Pendidikan paling menyenangkan','Semua orang seharusnya membaca','Indonesia memproklamasikan kemerdekaan pada 17 Agustus 1945','Buku itu paling menarik'],2,'Tanggal proklamasi merupakan fakta sejarah yang dapat diverifikasi.'],
['Kata “akibatnya” menunjukkan hubungan ...',['Pertentangan','Tujuan','Akibat','Pilihan'],2,'Akibatnya menandai dampak atau hasil.'],
['Manakah verba mental?',['Menanam','Berlari','Meyakini','Mendorong'],2,'Meyakini menunjukkan proses mental atau aktivitas pikiran.'],
['Kata “sering” termasuk ...',['Kata tempat','Adverbia frekuensi','Konjungsi sebab','Kata sifat'],1,'Sering menunjukkan tingkat keseringan suatu tindakan.'],
['Kalimat retoris adalah ...',['Kalimat perintah','Pertanyaan untuk menggugah atau menegaskan gagasan','Pertanyaan yang wajib dijawab','Kalimat statistik'],1,'Kalimat retoris tidak terutama meminta jawaban langsung.'],
['Manakah kata ganti petunjuk?',['Karena','Mereka','Tersebut','Mungkin'],2,'Tersebut merujuk pada hal yang telah disebutkan.'],
['Contoh konjungsi kausalitas adalah ...',['Namun','Atau','Karena','Sedangkan'],2,'Karena menghubungkan peristiwa dengan penyebabnya.'],
['Unsur yang berisi posisi utama penulis adalah ...',['Topik','Tesis','Ilustrasi','Simpulan'],1,'Tesis merupakan posisi atau pendapat utama penulis.'],
['Argumentasi analogi menggunakan ...',['Perbandingan yang relevan','Angka tanpa sumber','Ajakan langsung','Urutan waktu'],0,'Analogi menggunakan kesamaan dua hal untuk menguatkan penjelasan.'],
['Bukti argumentasi yang baik harus ...',['Tidak perlu sumber','Relevan, akurat, dan tepercaya','Berdasarkan kabar saja','Dibuat-buat'],1,'Bukti harus relevan, akurat, cukup, dan memiliki sumber tepercaya.'],
['Gagasan utama di awal paragraf disebut ...',['Induktif','Campuran','Deduktif','Analogi'],2,'Paragraf deduktif dimulai dari gagasan umum lalu penjelasan khusus.'],
['Fungsi kesimpulan adalah ...',['Memperkenalkan tokoh','Menambah topik baru','Menegaskan pendapat berdasarkan pembahasan','Mengganti argumen'],2,'Kesimpulan merangkum dan menegaskan posisi penulis.']
];let n=0,chosen=null,score=0,answers=[];
function draw(){let q=Q[n];chosen=null;$('#counter').textContent=`SOAL ${n+1} DARI ${Q.length}`;$('#percent').textContent=Math.round(n/Q.length*100)+'% selesai';$('#bar').style.width=(n/Q.length*100)+'%';$('#question').textContent=q[0];$('#answers').innerHTML='';$('#explain').innerHTML='';q[1].forEach((t,i)=>{let l=document.createElement('label');l.className='answer';l.innerHTML=`<input type="radio" name="q"><b>${'ABCD'[i]}.</b> ${t}`;l.onclick=()=>{chosen=i;$$('.answer').forEach(x=>x.classList.remove('selected'));l.classList.add('selected');$('input',l).checked=true;$('#next').disabled=false};$('#answers').append(l)});$('#next').disabled=true;$('#next').textContent=n===Q.length-1?'Lihat hasil →':'Jawaban berikutnya →'}
$('#next').onclick=()=>{if(chosen===null)return;answers[n]=chosen;if(chosen===Q[n][2])score++;if(n<Q.length-1){n++;draw()}else finish()};
function finish(){ $('#question').textContent='Latihan selesai!';$('#answers').innerHTML='';$('#next').style.display='none';$('#bar').style.width='100%';$('#percent').textContent='100% selesai';let p=Math.round(score/Q.length*100);$('#explain').innerHTML=`<div class="result"><strong>${p}</strong><b>${score} dari ${Q.length} jawaban benar</b><p>${p>=90?'Luar biasa!':p>=70?'Bagus, pertahankan!':p>=50?'Cukup baik, pelajari lagi pembahasan.':'Ayo pelajari kembali materi dan coba lagi.'}</p><button class="cta" id="review">Lihat pembahasan</button> <button class="cta" id="again">Ulangi kuis</button></div>`;$('#review').onclick=review;$('#again').onclick=reset}
function review(){let out='<h3>Pembahasan setiap soal</h3>';Q.forEach((q,i)=>out+=`<div class="explain"><b>${i+1}. ${q[0]}</b><br>Jawaban: ${'ABCD'[q[2]]}. ${q[1][q[2]]}<br>${q[3]}</div>`);$('#explain').innerHTML=out+'<button class="cta" id="again2">Ulangi kuis</button>';$('#again2').onclick=reset}
function reset(){n=0;score=0;answers=[];$('#next').style.display='inline-block';draw()}draw();