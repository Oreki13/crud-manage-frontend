let corosel = $('#corosel').text()
let tes = 'Penghargaan atas dukungan Kementrian PUPR kepada BNPB dalan kegiatanpenanggulangan bencana Tsd 019saaskjdaskjdh'
// console.log(tes.length);
$(window).resize(function () {
    let width = $(window).width();

    if (width > 768) {
        $('#mobile').hide()
        $('#mobile-berita').addClass('d-none')
        $('#web').show()
        $('#web-berita').removeClass('d-none')
        $('#garis').show()
        $('#produk').addClass('d-flex')
    } else {
        $('#mobile').show()
        $('#mobile-berita').removeClass('d-none')
        $('#web').hide()
        $('#web-berita').addClass('d-none')
        $('#garis').hide()
        $('#produk').removeClass('d-flex')
    }

    if (width > 800) {
        $('.carousel-item').each(function (s, d) {
            $('.rosel').addClass('in-corosel')
            $('.rosel > img').addClass('img-corosel')
        })

    } else {
        $('.carousel-item').each(function (s, d) {
            $('.rosel').removeClass('in-corosel')
            $('.rosel > img').removeClass('img-corosel')
        })

    }
    console.log(width);

    if (width > 1000) {
        $('#kotak-nav').show()
        $('#text-nav').removeClass('text-white')
        $('#text-nav').addClass('text-black')
        $('#togle').removeClass('togleopen')
    } else {
        $('#kotak-nav').hide()
        $('#text-nav').removeClass('text-black')
        $('#text-nav').addClass('text-white')
        $('#togle').addClass('togleopen')

    }
})

const godetail = () => {
    window.location = 'detail.html'
}

$(document).ready(function () {




    let width = $(window).width();



    function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }
    var d = new Date();
    console.log(timeSince(d.setDate(d.getDate() - 3)));
    console.log(timeSince(1586780382047))





    if (width > 768) {
        $('#mobile').hide()
        $('#mobile-berita').addClass('d-none')
        $('#web').show()
        $('#web-berita').removeClass('d-none')
        $('#garis').show()
        $('#produk').addClass('d-flex')
    } else {
        $('#mobile').show()
        $('#mobile-berita').removeClass('d-none')
        $('#web').hide()
        $('#web-berita').addClass('d-none')
        $('#garis').hide()
        $('#produk').removeClass('d-flex')
    }

    if (width > 800) {
        $('.carousel-item').each(function (s, d) {
            $('.rosel').addClass('in-corosel')
            $('.rosel > img').addClass('img-corosel')
        })

    } else {
        $('.carousel-item').each(function (s, d) {
            $('.rosel').removeClass('in-corosel')
            $('.rosel > img').removeClass('img-corosel')
        })

    }


    if (width > 1000) {

        $('#togle').removeClass('togleopen')
    } else {
        $('#text-nav').removeClass('text-black')
        $('#text-nav').addClass('text-white')
        $('#kotak-nav').hide()
    }


    if (corosel.length > 117) {
        let slice = corosel.substr(0, 177) + '...'
        // console.log(slice);

        $('#corosel').text(slice)
    }
    $('.grid').masonry({
        // options
        itemSelector: '.grid-item',
        columnWidth: 20,
        gutter: 15
    });
    // $('#carouselExampleControls').on('slid.bs.carousel', function () {

    //     console.log(width);




    //     if (width > 800) {
    //         console.log('asdasdasdad');
    //         $('#in-corosel').addClass('in-corosel')
    //         $('#in-corosel > img').addClass('img-corosel')
    //     } else {
    //         console.log('2222222222222');
    //         $('#in-corosel').removeClass('in-corosel')
    //         $('#in-corosel > img').removeClass('img-corosel')
    //     }
    // })
})

