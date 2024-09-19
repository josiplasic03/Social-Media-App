class Post {
    post_id = '';
    post_content = '';
    user_id = '';
    api_url = 'https://658d4b6e7c48dce94738dbfa.mockapi.io';

    async create() {
        let session = new Session();
        session_id = session.getSession();
        let data = {
            user_id: session_id,
            content: this.post_content,
            likes: 0
        }

        data = JSON.stringify(data);
        let response = await fetch(this.api_url + '/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        data = await response.json();

        return data;
    }

    async getAllPosts() {
        let response = await fetch(this.api_url + '/posts');
        let data = await response.json();
        return data;
    }

    like(post_id, likes) {
        let data = {
            likes: likes,
        };
    
        data = JSON.stringify(data);
        // bug!
        fetch(`${this.api_url}/posts/${post_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {

            console.log(data);
        })
        .catch(error => {
            console.error('Greška prilikom slanja PUT zahtjeva:', error);
        });
    }

    delete(post_id) {
        fetch(this.api_url + '/posts/'+ post_id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {});
    }
}