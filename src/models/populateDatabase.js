import User from './User';
import Post from './Post';

export default function () {

    User.count().exec((err, count) => {
        if (count > 0) {
            return;
        }

        const user1 = new User({ email: 'user1@user1.com', password: 'user1pass', profile: { name: 'Adam', gender: 'm', location: 'pl', website: '1.pl', picture: '1.jpg' } });
        const user2 = new User({ email: 'user2@user2.com', password: 'user2pass', profile: { name: 'Ada', gender: 'w', location: 'pl', website: '2.pl', picture: '2.jpg' } });

        User.create([user1, user2], (error) => {
            if (!error) {
                console.log('Users loaded');
            }
        });

    });
    
    

    Post.count().exec((err, count) => {
        if (count > 0) {
            return;
        }

        const content1 = `Sed ut perspiciatis unde omnis iste natus error
        sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
        vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
        aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
        qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
        ipsum quia dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
        est laborum`;

        const content2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
        est laborum. Sed ut perspiciatis unde omnis iste natus error
        sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
        vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
        aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
        qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
        ipsum quia dolor sit amet.`;

        const post1 = new Post({ name: 'Admin', title: 'Hello MERN', slug: 'hello-mern', cuid: 'cikqgkv4q01ck7453ualdn3hd', content: content1 });
        const post2 = new Post({ name: 'Admin', title: 'Lorem Ipsum', slug: 'lorem-ipsum', cuid: 'cikqgkv4q01ck7453ualdn3hf', content: content2 });
        const post3 = new Post({ name: 'Admin', title: 'mojpost', slug: 'moj-post', cuid: 'cikqgkv4q01ck7453ualdn3he', content: content2 })

        Post.create([post1, post2, post3], (error) => {
            if (!error) {
                console.log('Posts loaded');

                function retrieveUser(email, callback) {
                    User.find({ email: email }, function(err, users) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, users[0]);
                        }
                    });
                };
                // var userWithPosts = User.findOne({ email: 'user1@user1.com' });
                retrieveUser('user1@user1.com', function(err, user) {
                    if (err) {
                        console.log(err);
                    }

                    user.profile.posts.push(post1);
                    user.profile.posts.push(post3);
                    user.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                        // res.json('yep');
                    })
                });
            }
        });
        
    });



    




}