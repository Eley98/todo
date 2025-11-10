const btn = document.getElementById('Btn');
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');

btn.addEventListener('click', () => {
 
  if (img1.style.display === 'block') {
    img1.style.display = 'none';
    img2.style.display = 'block';

    document.body.classList.add('dark-theme');
  } else {
   
    img1.style.display = 'block';
    img2.style.display = 'none';


    document.body.classList.remove('dark-theme');
  }
});



