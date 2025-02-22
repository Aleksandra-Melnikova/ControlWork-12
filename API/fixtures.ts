import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "node:crypto";
import Photo from "./models/Photo";



const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('photos');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not presents, skipping drop ');
    }

    const[Jane, John]=await User.create({
            email: "Jane@mail.com",
            password: "123",
            token: randomUUID(),
            role: "admin",
        displayName: "Jane",
        image: "fixtures/Jane1.jpg",
        },
        {
           email: "John@mail.com",
            password: "123",
            token: randomUUID(),
            role: "user",
            displayName: "John",
            image: "fixtures/John.webp",
        });


    await Photo.create({
            user: Jane._id,
            title: "Ala Archa Nature Reserve",
            image: "fixtures/ala_archa_kyrgyzstan",
        },
        {
            user: Jane._id,
            title: "Lake Issyk Kul",
            image: "fixtures/kyrgyzstan-legends-issyk-kul-legend.jpg",
        },
        {
            user: Jane._id,
            title: "Bishkek city",
            image: "Bishkek.jpg",
        },
        {
            user: John._id,
            title: "London city",
            image: "London.jpg",
        },
        {
            user: John._id,
            title: "Paris city",
            image: "Paris.jpg",
        },
        {
            user: John._id,
            title: "Beautiful mountains",
            image: "mountain.jpg",
        },

        );

    await db.close();
};

run().catch(console.error);