const endomondo = require('endomondo-unofficial-api');

endomondo.authenticate({email: 'wojciech.mazur95@gmail.com', password: 'GB]x5@eBvC'})
    .then((result) => {
        console.log(result);
        const authToken = result.authToken;
            endomondo.workout.get({
                authToken: authToken,
                workoutId: 1082578924
            })
                .then((result) => console.log(result))
                .catch((err) => console.log(err));


    }
    )
    .catch((err) => console.log(err));


