function searchMovie() {
    $('#movie-list').html('');
    //Menghapus konten sebelumnya di elemen dengan ID movie-list.
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        datatype: 'json',
        data: {
            'apikey': '6df5ea04',
            's': $('#search-input').val()
        },
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;
                $.each(movies, function (i, data) {
                    // Replace the film card append section with this code:
                        $('#movie-list').append(`
                            <div class="col-md-4 mb-4 d-flex align-items-stretch">
                                <div class="card w-100 shadow-sm border-0" style="border-radius: 15px; overflow: hidden;">
                                    
                                    <div class="poster-container">
                                        
                                        <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://dummyimage.com/600x900/000/000.png'}" 
                                            class="card-img-top ${data.Poster === 'N/A' ? 'filter-blur' : ''}" 
                                            alt="${data.Title}"
                                            style="height: 100%; width: 100%; object-fit: cover;"
                                            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">

                                        <div class="content-warning-overlay" 
                                            style="${data.Poster !== 'N/A' ? 'display: none;' : 'display: flex;'}">
                                            
                                            <i class="bi bi-exclamation-triangle-fill text-danger mb-2" style="font-size: 2.5rem;"></i>
                                            <h6 class="text-white fw-bold">CONTENT RESTRICTED</h6>
                                            <p class="text-light" style="font-size: 11px; line-height: 1.4;">
                                                Flagged for potential violations:<br>
                                                <span class="text-danger fw-bold">Pornography, Harassment, or Religious Sensitivity.</span>
                                            </p>
                                            <span class="badge bg-danger rounded-pill px-3 py-2" style="font-size: 10px;">Safety First</span>
                                        </div>
                                    </div>

                                    <div class="card-body bg-white d-flex flex-column">
                                        <h5 class="card-title fw-bold text-dark text-truncate" title="${data.Title}">${data.Title}</h5>
                                        <p class="card-text text-secondary mb-4 small">
                                            <i class="bi bi-calendar-event me-1"></i> ${data.Year}
                                        </p>
                                        <a href="#" class="btn btn-outline-primary w-100 rounded-pill mt-auto see-detail" 
                                            data-bs-toggle="modal" data-bs-target="#exampleModal" 
                                            data-id="${data.imdbID}">
                                            View Details
                                        </a>
                                    </div>
                                </div>
                            </div>
                        `);
                }); //Menampilkan setiap film dalam format kartu dengan poster, judul, dan tahun rilis.
                $('#search-input').val('');
            } else {
                $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">` + result.Error + `</h1>
                    </div>
                `);
            }
             // Menampilkan pesan kesalahan.
        }
    });
}

$('#search-button').on('click', function () {
    searchMovie();
});
/*Event Binding:
Mengikat fungsi pencarian ke tombol dan input
*/ 

$('#search-input').on('keyup', function (e) {
    if (e.which === 13) {
        searchMovie();
    }
});

/*
Pencarian dengan Enter;
*/

$('#movie-list').on('click', '.see-detail', function () {
    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': '6df5ea04',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response === "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="` + movie.Poster + `" class="img-fluid">    
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>` + movie.Title + `</h3></li>
                                    <li class="list-group-item">Released : ` + movie.Released + `</li>
                                    <li class="list-group-item">Genre : ` + movie.Genre + `</li>
                                    <li class="list-group-item">Director : ` + movie.Director + `</li>
                                    <li class="list-group-item">Actors : ` + movie.Actors + `</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});


// event binding/event delegation

//'i': id
//'t': judul
//'s': mencari
