let music = require('musicmatch')({apikey:"52d6ace43232f2a871e699dc324ffbe8"});


music.trackSearch({q:"Любимка", page:1, page_size:3})
    .then(function(data){
        console.log(data.message.body.track_list);
    }).catch(function(err){
        console.log(err);
})

