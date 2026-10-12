const reviewLists = document.querySelectorAll('.review_track');

reviewLists.forEach(list => {

    const interval = Number(list.dataset.interval);
    const reviews = list.querySelectorAll('.review');

    let current = 0;    
    const per_review = 100 / reviews.length;

    function nextReview() {

        current++;
      

        if (current >= reviews.length) {


            // Quitamos la transición
            list.style.transition = 'none';

            current = 0;

            list.style.transform =
                `translateX(-${current * per_review}%)`;

            // Forzamos el render
            list.offsetHeight;

            // Volvemos a activar la transición
            list.style.transition = 'transform 600ms ease-in-out';
            setTimeout(nextReview, 0);


        } else {

            list.style.transform =
                `translateX(-${current * per_review}%)`;
        }
    }

    setInterval(nextReview, interval);




});