function clobber(name, content, repo) {
    proj = '/ide/project/'+PROJECT_ID
    $.post(proj+'/create_source_file', {name: name}, function(data, status) {
        console.log("created file")
        console.log(data)
        var file_id = data.file.id
        $.get(proj+'/source/'+file_id+'/load', function(data, status) {
            console.log("loaded file")
            console.log(data)
            d = {content: content, modified: data.modified, folded_lines: '%5B%5D'}
            $.post(proj+'/source/'+file_id+'/save', d, function(data, status){
                console.log("saved file")
                console.log(data)
                d = {
                    repo: 'https://github.com/'+USER_SETTINGS.github.username+'/'+repo,
                    auto_pull: 0, auto_build: 0, branch: 'master'
                }
                $.post(proj+'/github/repo', d, function(data, status) {
                    console.log("changed repo")
                    console.log(data)
                    $.post(proj+'/github/commit', {commit_message: 'h0h0'}, function(data, status) {
                        console.log("pushed to github")
                        console.log(data)
                    })
                })
            })
        })
    })
}

clobber('clobber.js', 'hurr ' + Date(), 'clobber')
