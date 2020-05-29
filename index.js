


music.trackSearch({q:"Любимка", page:1, page_size:3})
    .then(function(data){
        console.log(data.message.body.track_list);
    }).catch(function(err){
        console.log(err);
})

