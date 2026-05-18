import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";
import doctorModel from "./models/doctorModel.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const doctors = [
    {
        name: 'Dr. Richard James',
        image: 'doc1.png',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Richard James is an experienced General Physician specializing in preventive care, diagnosis, and treatment of common illnesses. He is dedicated to helping patients maintain long-term health through personalized medical guidance.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Emily Larson',
        image: 'doc2.png',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Emily Larson is a skilled Gynecologist with expertise in women’s health, prenatal care, and reproductive wellness. She provides compassionate care and individualized treatment plans for patients of all ages.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Sarah Patel',
        image: 'doc3.png',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Sarah Patel is a Dermatologist specializing in skin, hair, and nail disorders. She offers advanced treatments for acne, eczema, pigmentation, and other dermatological conditions.',

        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Christopher Lee',
        image: 'doc4.png',
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Christopher Lee is a dedicated Pediatrician with a passion for providing compassionate care to children of all ages. He specializes in the diagnosis and treatment of various childhood illnesses and conditions.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Jennifer Garcia',
        image: 'doc5.png',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Jennifer Garcia is a Neurologist with expertise in diagnosing and treating disorders of the brain, spinal cord, and nervous system, including headaches, seizures, and neuropathies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Andrew Williams',
        image: 'doc6.png',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Andrew Williams is a Neurologist dedicated to managing complex neurological conditions. He combines clinical expertise with a patient-centered approach to improve quality of life.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Christopher Davis',
        image: 'doc7.png',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Christopher Davis is a General Physician known for his thorough evaluations and evidence-based treatments for a wide range of acute and chronic medical conditions.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Timothy White',
        image: 'doc8.png',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Timothy White is a Gynecologist with expertise in women\'s health, reproductive care, and the diagnosis and treatment of various gynecological conditions.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Ava Mitchell',
        image: 'doc9.png',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Ava Mitchell is a Dermatologist with expertise in diagnosing and treating various skin conditions, including acne, eczema, and psoriasis.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Jeffrey King',
        image: 'doc10.png',
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Jeffrey King is a Pediatrician with expertise in providing comprehensive healthcare for infants, children, and adolescents.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Zoe Kelly',
        image: 'doc11.png',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Zoe Kelly is a Neurologist dedicated to managing complex neurological conditions. She combines clinical expertise with a patient-centered approach to improve quality of life.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Patrick Harris',
        image: 'doc12.png',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Patrick Harris is a Neurologist with expertise in diagnosing and treating various neurological conditions, including migraines, epilepsy, and movement disorders.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Chloe Evans',
        image: 'doc13.png',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Chloe Evans is a General Physician with a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Ryan Martinez',
        image: 'doc14.png',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Ryan Martinez is a Gynecologist with expertise in women’s health, including reproductive health, prenatal care, and menopause management.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Amelia Hill',
        image: 'doc15.png',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Amelia Hill is a Dermatologist with expertise in diagnosing and treating various skin conditions, including acne, eczema, and psoriasis.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
        console.log("Database Connected");
        
        await doctorModel.deleteMany({});
        console.log("Existing doctors deleted");
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("password123", salt);

        for (let i = 0; i < doctors.length; i++) {
            const doc = doctors[i];
            const imagePath = path.join(process.cwd(), "..", "clientside", "assets_frontend", doc.image);
            console.log(`Uploading ${doc.image} ...`);
            
            const imageUpload = await cloudinary.uploader.upload(imagePath, { resource_type: "image" });
            
            const newDoctor = new doctorModel({
                name: doc.name,
                email: doc.name.toLowerCase().replace(/[^a-z0-9]/g, '') + "@example.com",
                password: hashedPassword,
                image: imageUpload.secure_url,
                speciality: doc.speciality,
                degree: doc.degree,
                experience: doc.experience,
                about: doc.about,
                fees: doc.fees,
                address: doc.address,
                date: Date.now()
            });
            await newDoctor.save();
            console.log(`Doctor ${doc.name} saved!`);
        }
        
        console.log("Database seeding completed!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database: ", error);
        process.exit(1);
    }
};

seedDB();
