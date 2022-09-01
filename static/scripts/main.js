(()=>{
    document.addEventListener('submit', async (e)=>{
        if (e.target.dataset.default === 'false') {
            e.preventDefault();
            document.querySelector(e.target.dataset.modal).classList.add('show');
            link_url.blur();
            document.querySelector(`${e.target.dataset.modal} .loader`).classList.add('show');

            let success = true;

            let request = await fetch(e.target.action, {
                method: 'POST',
                body: new FormData(e.target)
            }).catch((err)=>{
                success = false;
                document.querySelector(`${e.target.dataset.modal} .loader`).classList.remove('show');
                document.querySelector(`${e.target.dataset.modal} .error`).classList.add('show');
            });
            
            if (success) {
                let data = await request.json();
                if (data.status == 200) {
                    view = document.querySelector(`${e.target.dataset.modal} ${e.target.dataset.view}`);
                    if (view == qr) {
                        view.classList.add('show');
                        view.querySelector('img').src = data.data;
                        view.querySelector('p').innerText = data.message;
                    }
                } else {
                    if (view == qr) {
                        view.classList.add('show');
                        view.querySelector('img').src = '/static/svg/error.svg';
                        view.querySelector('p').innerText = data.message;
                    }   
                }
            }

            document.querySelector(`${e.target.dataset.modal} .loader`).classList.remove('show');
        }
    });

    document.addEventListener('click', (e)=>{
        if (e.target.closest('.close-modal')) {
            document.querySelector(e.target.closest('.close-modal').dataset.modal).classList.remove('show')
            document.querySelectorAll('.error').forEach(elem=>{
                elem.classList.remove('show');
            });

            qr.classList.remove('show');
        }

        if (e.target.closest('#download')) {
            let src = qr_img.src;
            const link = document.createElement('a');
            link.href = src;
            link.download = 'qrcode.png';
            link.click();
        }
    })
})();