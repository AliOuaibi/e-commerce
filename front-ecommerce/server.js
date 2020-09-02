const express = require("express");
let app = express();
const bodyParser = require("body-parser");
const axios = require('axios');
let fs = require('fs');

app.use(bodyParser.json({ limit: '50mb' }));
//app.use(express.bodyParser({limit: '50mb'}));
//app.use(multipart.json());


// INSCRIPTION (CLIENT)
app.post('/registerUser', async function (req, res) {
    //console.log(req.body.formRegister);
    let password = req.body.formRegister.password;
    let password_confirmation = req.body.formRegister.password_confirmation;

    if (password !== password_confirmation) {
        res.send('password');
        return;
    }
    try {
        await axios.post('http://localhost:8000/api/register', req.body.formRegister)
            .then(resp => {
                res.send(resp.data);
            });
        res.send('succes');
    } catch (error) {
        console.log(error);
        res.send('echec');
    }
   
})


// CONNEXION (CLIENT - ADMIN)
app.post('/logInUser', async function (req, res) {
    try {
        await axios.post('http://localhost:8000/api/login', req.body.formLogIn)
            .then(resp => {
                //console.log(resp.data);
                console.log('vous êtes connecté(e)');
                res.send(resp.data);
            });
    } catch (error) {
        console.log(error.message);
        res.send('echec');
    }
})



//////////////////////////////////////////////// ADMIN
// AJOUT ARTICLE (ADMIN)
app.post('/addProduct', async function (req, res) {

    try {

        let id = 0;



        function check_if_file_exist(id) {

            if (fs.existsSync('src/assets/IMG/Articles/img_product_' + id)) {
                id++;
                check_if_file_exist(id)
            }

            else {
                let id_pic1 = id;
                let id_pic2 = id_pic1 + 1;
                let id_pic3 = id_pic2 + 1;
                let id_pic4 = id_pic3 + 1;

                

                let file_name1 = 'img_product_' + id_pic1;
                fs.writeFile('src/assets/IMG/Articles/' + file_name1, req.body.formAddProduct['photo_1'], function (error) {
                    if (error) { console.log(error) };
                });
                req.body.formAddProduct['photo_1'] = file_name1;


                let file_name2 = 'img_product_' + id_pic2;
                fs.writeFile('src/assets/IMG/Articles/' + file_name2, req.body.formAddProduct['photo_2'], function (error) {
                    if (error) { console.log(error) };
                });
                req.body.formAddProduct['photo_2'] = file_name2;


                let file_name3 = 'img_product_' + id_pic3;
                fs.writeFile('src/assets/IMG/Articles/' + file_name3, req.body.formAddProduct['photo_3'], function (error) {
                    if (error) { console.log(error) };
                });
                req.body.formAddProduct['photo_3'] = file_name3;


                file_name4 = 'img_product_' + id_pic4;
                fs.writeFile('src/assets/IMG/Articles/' + file_name4, req.body.formAddProduct['photo_4'], function (error) {
                    if (error) { console.log(error) };
                });
                req.body.formAddProduct['photo_4'] = file_name4;
            }
        }
        check_if_file_exist(id);



        axios.post('http://localhost:8000/api/article/new', req.body.formAddProduct);
        res.send('succes');
        // console.log(req.body.formAddProduct)
    } catch (error) {
        console.log(error.message);
        res.send('echec');
    }
})


// EDITER UN ARTICLE (ADMIN)
app.post('/editProduct/:id', async function (req, res) {

    try {

        for (let i = 1; i <= 4; i++) {
            if (req.body.formEditProduct['photo' + i].substr(0, 12) == "img_product_") {

            }
            else {
                let id = 0;
                function check_if_file_exist(id) {

                    if (fs.existsSync('src/assets/IMG/Articles/img_product_' + id)) {
                        id++;
                        check_if_file_exist(id)
                    }

                    else {
                        let id_pic = id;

            

                        let file_name = 'img_product_' + id_pic;
                        fs.writeFile('src/assets/IMG/Articles/' + file_name, req.body.formEditProduct['photo' + i], function (error) {
                            if (error) { console.log(error) };
                        });
                        req.body.formEditProduct['photo' + i] = file_name;
                    }
                }
                check_if_file_exist(id);

            }
        }

        //console.log(req.body.formEditProduct);
        axios.patch('http://localhost:8000/api/article/edit/' + req.params.id, req.body.formEditProduct);
        res.send('succes');

    } catch (error) {
        console.log(error.message);
        res.send('echec');
    }
})


// SUPPRIMER UN ARTICLE
app.post('/deleteProduct/:id', async function (req, res) {
    try {
        axios.delete('http://localhost:8000/api/article/delete/' + req.params.id, req.body.formDeleteProduct);
        res.send('succes');

    } catch (error) {
        res.send('echec');
    }

});


// EDITER UNE CATEGORIE (ADMIN)
app.post('/editCategorie/:id', async function (req, res) {
  
    try {

        if (req.body.formEditCategorie['photo'].substr(0, 14) == "img_categorie_") {

        }
        else {
            let id = 0;
            function check_if_file_exist(id) {

                if (fs.existsSync('src/assets/IMG/Categories/img_categorie_' + id)) {
                    id++;
                    check_if_file_exist(id)
                }

                else {
                    let id_pic = id;

                  

                    let file_name = 'img_categorie_' + id_pic;
                    fs.writeFile('src/assets/IMG/Categories/' + file_name, req.body.formEditCategorie['photo'], function (error) {
                        if (error) { console.log(error) };
                    });
                    req.body.formEditCategorie['photo'] = file_name;
                }
            }
            check_if_file_exist(id);

        }


        axios.patch('http://localhost:8000/api/categorie/edit/' + req.params.id, req.body.formEditCategorie);
        res.send('succes');

    } catch (error) {
        console.log(error.message);
        res.send('echec');
    }
})


// SUPPRIMER UNE CATEGORIE
app.post('/deleteCategorie/:id', async function (req, res) {
    try {
        axios.delete('http://localhost:8000/api/categorie/delete/' + req.params.id, req.body.formDeleteCategorie);
        res.send('succes');

    } catch (error) {
        res.send('echec');
    }

});

// AJOUT ASSOCIATION (ADMIN)
app.post('/addAsso', async function (req, res) {
    try {
        //console.log(req.body.formAddAsso);
        let id = 0;
        if (req.body.formAddAsso.photo !== undefined) {

            function check_if_file_exist(id) {

                if (fs.existsSync('src/assets/IMG/Associations/img_asso_' + id)) {
                    id++;
                    check_if_file_exist(id)
                }
                else {

                    file_name = 'img_asso_' + id;
                    fs.writeFile('src/assets/IMG/Associations/' + file_name, req.body.formAddAsso.photo, function (error) {
                        if (error) {
                            throw 'Create ' + file_name + ' KO';
                        }
                    });
                    req.body.formAddAsso.photo = file_name;
                }
            }
            check_if_file_exist(id);

            delete req.body.formAddAsso['titleAsso'];
            delete req.body.formAddAsso['descriptionAsso'];
            delete req.body.formAddAsso['pictureAsso'];
            

            await axios.post('http://localhost:8000/api/insert_association', req.body.formAddAsso)
                .then(resp => {
                    //console.log(resp.data);
                    res.send(resp.data);
                });
        }
    } catch (error) {
        console.log(error.message);
    }
})

// RECUPERER LES ASSOCIATION (ADMIN)
app.get('/allAsso', async function (req, res) {
    try {
        await axios.get('http://localhost:8000/api/fetch_association', req.body.formFindAsso)
            .then(resp => {
                //console.log(resp.data,'api');
                res.send(resp.data);
            });
    } catch (error) {
        console.log(error.message)
    }

})



// AFFICHER UNE ASSOCIATION
app.get('/findAsso/:id_association', async function (req, res) {
    await axios.get('http://localhost:8000/api/fetch_association_id/' + req.params.id_association)
        .then(resp => {
            //console.log(resp.data, "RESP");

            if (resp.data.association == null) {
                //console.log("NULL -------- NOT FOUND");
                res.send("not found");
            }
            else {
                //console.log(resp.data.association, "-------- NOT NULL");
                res.send(resp.data.association);
            }

        });
})

// RECUPERER LES CONTINENTS (ADMIN)
app.get('/allContinent', async function (req, res) {
    await axios.get('http://localhost:8000/api/fetch_continent', req.body.formFindContinent)
        .then(resp => {
            // console.log(resp.data,'api');
            res.send(resp.data);
        });
})

// RECUPERER LES PAYS (ADMIN)
app.get('/allPays', async function (req, res) {
    await axios.get('http://localhost:8000/api/fetch_countrie', req.body.formFindCountrie)
        .then(resp => {
            // console.log(resp.data,'api');
            res.send(resp.data);
        });
})

// RECUPERER LES CATEGORIE (ADMIN)
app.get('/allCategorie', async function (req, res) {
    await axios.get('http://localhost:8000/api/fetch_categorie', req.body.formFindCategorie)
        .then(resp => {
            //console.log(resp.data,'api');
            for (let i = 0; i < resp.data.categories.length; i++) {

                //récupérer le contenu en data uri du fichier img_product
                file_name = resp.data.categories[i]['photo'];
                resp.data.categories[i]['photo'] = fs.readFileSync('src/assets/IMG/Categories/' + file_name, { encoding: 'utf8', flag: 'r' })

            }
            res.send(resp.data);
        });
})

// AJOUT CATEGORIE (ADMIN)
app.post('/addCategorie', async function (req, res) {
    try {
        //console.log(req.body.formAddCategorie);
        let id = 0;
        if (req.body.formAddCategorie.photo !== undefined) {

            function check_if_file_exist(id) {

                if (fs.existsSync('src/assets/IMG/Categories/img_categorie_' + id)) {
                    id++;
                    check_if_file_exist(id)
                }
                else {
                    file_name = 'img_categorie_' + id;
                    fs.writeFile('src/assets/IMG/Categories/' + file_name, req.body.formAddCategorie.photo, function (error) {
                        if (error) {
                            throw 'Create ' + file_name + ' KO';
                        }
                    });
                    req.body.formAddCategorie.photo = file_name;
                }
            }
            check_if_file_exist(id);

            delete req.body.formAddCategorie['titleCategorie'];
            delete req.body.formAddCategorie['pictureCategorie'];
            //console.log(req.body.formAddCategorie);

            await axios.post('http://localhost:8000/api/insert_categorie', req.body.formAddCategorie)
                .then(resp => {
                    //console.log(resp.data);
                    res.send(resp.data);
                });
        }
    } catch (error) {
        console.log(error);
    }
})


// gérer les commandes
app.get('/allOrders', async function (req, res) {
    try {

        await axios.get('http://localhost:8000/api/fetch_orders')
            .then(resp => {
                //console.log(resp.data);
                res.send(resp.data);
            });
    } catch (error) {
        console.log(error.message);
    }
})

// gérer les commandes
app.post('/updateOrder/:id', async function (req, res) {

    try {
        //console.log(req.body.formUpdateOrder)
        await axios.patch('http://localhost:8000/api/gestion_orders/' + req.params.id, req.body.formUpdateOrder)
            .then(resp => {
                //console.log(resp.data);
                res.send("succes");
            });
    } catch (error) {
        console.log(error.message);
    }
})


// gérer les clients
app.get('/allUsers', async function (req, res) {
    try {

        await axios.get('http://localhost:8000/api/fetch_users')
            .then(resp => {
                res.send(resp.data);
            });
    } catch (error) {
        console.log(error.message);
    }
})

// AFFICHER UNE ASSOCIATION
app.get('/findAsso/:id_association', async function (req, res) {
    //console.log(req.params.id_association)
    try {
        await axios.get('http://localhost:8000/api/fetch_association_id/' + req.params.id_association)
            .then(resp => {
                res.send(resp.data);
            });
    } catch (error) {
        console.log(error.message);
    }
})


//AFFICHER LES COMMENTAIRES D'UN ARTICLE

app.get('/allComment/:id_article', async function (req, res) {
    // console.log(req.params.id_article)
    try {
        await axios.get('http://localhost:8000/api/comments/' + req.params.id_article)
            .then(resp => {
                // console.log(resp, "CESTBON")
                res.send(resp.data);
            });
    } catch (error) {
        console.log(error.message);
    }
})


//AJOUTER COMMENTAIRE SUR ARTICLE 

app.post('/addComment', async function (req, res) {
    //console.log(req.body.formComment)
    try {
        axios.post('http://localhost:8000/api/article/comment', req.body.formComment);
        res.send('succes');
        console.log(req.body.formComment, "FORMCOMMENT")
    } catch (error) {
        console.log(error.message);
        res.send('echec');
        alert('ECHEC')
    }
})

    //////////////////////////////////////////////// EDIT PROFIL (CLIENT)
    // password
    app.post('/editPassword/:id', async function (req, res) {
        try {
            //console.log(req.body.formEditPassword);

            await axios.patch('http://localhost:8000/api/user/editPass/' + req.params.id, req.body.formEditPassword)
                .then(resp => {
                    res.send("succes");
                });
        } catch (error) {
            console.log(error.message);
        }
    })


    // PAIEMENT
    // console.log(req.body.formPayment, "form payment")
    app.post('/payment', async function (req, res) {
        // console.log(req.body.formPayment, "test");
        // let  products = req.body.formPayment.Listproduct;
        // let user =req.body.formPayment.user.id;
        //console.log(req.body.formPayment)

        try {
            await axios.post('http://localhost:8000/api/payment', req.body.formPayment)
                .then(resp => {
                    //console.log(resp.data, "iciiiiiiiiii")
                    res.send(resp.data);
                });
            res.send('succes');
        } catch (error) {
            console.log(error);
            res.send('echec');
        }


    })


    // infos
    app.post('/editProfile/:id', async function (req, res) {
        try {
            //console.log(req.body.formEditProfile);

            await axios.patch('http://localhost:8000/api/user/edit/' + req.params.id, req.body.formEditProfile)
                .then(resp => {
                    console.log(resp.data);

                    res.send("succes");
                });
        } catch (error) {
            console.log(error.message);
        }
    })


    // orders
    app.get('/myOrders/:id', async function (req, res) {
        try {

            await axios.get('http://localhost:8000/api/fetch_orders/' + req.params.id)
                .then(resp => {
                    //console.log(resp.data);
                    res.send(resp.data);
                });
        } catch (error) {
            console.log(error.message);
        }
    })







    //////////////////////////////////////////////// SHOP
    // RECHERCHE ARTICLE
    app.post('/Recherche', async function (req, res) {
        try {
            await axios.post('http://localhost:8000/api/recherche', req.body.formSearch);
            //console.log('C bon');
            res.send('succes');
        } catch (error) {
            console.log(error.message);
            res.send('echec');
        }
    })


    // AFFICHER UN ARTICLE (SHOP)
    app.get('/findArticle/:id_article', async function (req, res) {

        await axios.get('http://localhost:8000/api/article/' + req.params.id_article)
            .then(resp => {
                if (resp.data.article == null) {
                    //console.log(resp.data);
                    res.send("not found");
                }
                else {

                    let file1 = resp.data.article['photo1'];
                    let file2 = resp.data.article['photo2'];
                    let file3 = resp.data.article['photo3'];
                    let file4 = resp.data.article['photo4'];

                    var fs = require('fs');
                    resp.data.article['photo1'] = fs.readFileSync('src/assets/IMG/Articles/' + file1, { encoding: 'utf8', flag: 'r' })
                    resp.data.article['photo2'] = fs.readFileSync('src/assets/IMG/Articles/' + file2, { encoding: 'utf8', flag: 'r' })
                    resp.data.article['photo3'] = fs.readFileSync('src/assets/IMG/Articles/' + file3, { encoding: 'utf8', flag: 'r' })
                    resp.data.article['photo4'] = fs.readFileSync('src/assets/IMG/Articles/' + file4, { encoding: 'utf8', flag: 'r' })
                    resp.data.article['photo_name1'] = file1;
                    resp.data.article['photo_name2'] = file2;
                    resp.data.article['photo_name3'] = file3;
                    resp.data.article['photo_name4'] = file4;
                    res.send(resp.data);
                }

            });
    })

    // AFFICHER ARTICLE VIA CATEGORIE(SHOP)
    app.get('/categorieArticle/:categorieId', async function (req, res) {

        try {
            await axios.get('http://localhost:8000/api/article_categorie/' + req.params.categorieId)
                .then(resp => {
                    //console.log(resp, 'daaaaataaaaa');
                    if (resp.data.article == "") {
                        res.send("not found");
                    }
                    else {
                        //console.log(resp.data.article, 'yoyoyoyo');
                        for (let i = 0; i < resp.data.article.length; i++) {
                            // supprimer les images inutiles
                            console.log(resp.data.article[i]['photo1'], 'tttttttttttttttt');

                            // récupérer le contenu en data uri du fichier img_product
                            file_name = resp.data.article[i]['photo1'];
                            resp.data.article[i]['photo1'] = fs.readFileSync('src/assets/IMG/Articles/' + file_name, { encoding: 'utf8', flag: 'r' })

                        }
                        res.send(resp.data);
                    }

                })
        } catch (error) {
            console.log(error, 'errooooooor');
            res.send('echec');
        };
    })

    // AFFICHER TOUS LES ARTICLES
    app.get('/allArticle', async function (req, res) {
        try {
            await axios.get('http://localhost:8000/api/articles')
                .then(resp => {
                    if (resp.data.articles == null) {
                       // console.log(resp.data);
                        res.send("not found");
                    }
                    else {
                        //console.log(resp.data.articles) 
                        for (let i = 0; i < resp.data.articles.length; i++) {
                            //supprimer les images inutiles
                            delete resp.data.articles[i]['photo2'];
                            delete resp.data.articles[i]['photo3'];
                            delete resp.data.articles[i]['photo4'];

                            //récupérer le contenu en data uri du fichier img_product
                            file_name = resp.data.articles[i]['photo1'];
                            resp.data.articles[i]['photo1'] = fs.readFileSync('src/assets/IMG/Articles/' + file_name, { encoding: 'utf8', flag: 'r' })

                        }
                        res.send(resp.data);
                    }

                });

        } catch (error) {
            console.log(error.message)
        }
    })




    // AFFICHER UNE CATEGORIE
    app.get('/findCategorie/:id_categorie', async function (req, res) {
        await axios.get('http://localhost:8000/api/fetch_categorie/' + req.params.id_categorie)
            .then(resp => {
                //récupérer le contenu en data uri du fichier img_categorie
                file_name = resp.data.categorie['photo'];
                resp.data.categorie['photo'] = fs.readFileSync('src/assets/IMG/Categories/' + file_name, { encoding: 'utf8', flag: 'r' })
                resp.data.categorie['photo_name'] = file_name;
                res.send(resp.data);
            });
    })




    //////////////////////////////////////////////// HOMEPAGE
    // AFFICHER LES 3 DERNIERS ARTICLES
    app.get('/newArticle', async function (req, res) {
        try {
            await axios.get('http://localhost:8000/api/articles/last')
                .then(resp => {
                    if (resp.data.last_articles == null) {
                        ;
                        res.send("not found");
                    }
                    else {
                        //console.log(resp.data.last_articles)
                        for (let i = 0; i < resp.data.last_articles.length; i++) {
                            //supprimer les images inutiles
                            delete resp.data.last_articles[i]['photo2'];
                            delete resp.data.last_articles[i]['photo3'];
                            delete resp.data.last_articles[i]['photo4'];

                            //récupérer le contenu en data uri du fichier img_product
                            file_name = resp.data.last_articles[i]['photo1'];
                            resp.data.last_articles[i]['photo1'] = fs.readFileSync('src/assets/IMG/Articles/' + file_name, { encoding: 'utf8', flag: 'r' })

                        }
                        res.send(resp.data);
                    }

                });

        } catch (error) {
            console.log("last_articles", error)
        }
    })
    app.listen(4242, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`server listening on http://localhost:4242`);
        }
    })