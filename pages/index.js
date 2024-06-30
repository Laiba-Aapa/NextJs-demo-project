import React, { Fragment } from 'react'
import MeetupList from '@/components/meetups/MeetupList'
import { MongoClient } from 'mongodb';
import Head from 'next/head';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'First MeetUp',
        image: 'https://tse1.mm.bing.net/th?id=OIP.VMUZ_Hu6tJGmT6H5Jz6-PAHaFj&pid=Api&P=0&h=220',
        address: 'Some Adsress 0123 , some city xyz ',
        description: 'This is a first meetup',
    },
    {
        id: 'm2',
        title: 'Second MeetUp',
        image: 'https://tse1.mm.bing.net/th?id=OIP.VMUZ_Hu6tJGmT6H5Jz6-PAHaFj&pid=Api&P=0&h=220',
        address: 'Some Adsress 7684 , some city xyz ',
        description: 'This is a Second meetup',
    },
]
function HomePage(props) {


    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name='description' content='Browse a huge list of highly active React meetups! ' />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}
export async function getStaticProps() {
    // fetch data from an API

    const client = await MongoClient.connect(
        'mongodb+srv://laiba_awan:Particle.1@cluster0.c08er1x.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1
    };
}
export default HomePage
