import React from 'react'
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '@/components/meetups/MeetupDetail'
function MeetupDetails(props) {
    return (
        <Fragment>
            <Head>
                <title>
                    {props.meetupData.title}
                </title>
                <meta name='description' content={props.meetupData.description} />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
    );
}

export async function getStaticPaths() {

    const client = await MongoClient.connect(
        'mongodb+srv://laiba_awan:Particle.1@cluster0.c08er1x.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            },
        }))



    }
}
export async function getStaticProps(context) {
    //  fetch all ata from the backend

    const meetupId = context.params.meetupId;// to get the id

    const client = await MongoClient.connect(
        'mongodb+srv://laiba_awan:Particle.1@cluster0.c08er1x.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetups = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId),
    });// fetch that data whose id is meetupId and ObjectId will convert id back to object from string

    console.log(selectedMeetups)

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetups._id.toString(),
                title: selectedMeetups.title,
                image: selectedMeetups.image,
                address: selectedMeetups.address,
                description: selectedMeetups.description,
            }
        }
    }

}

export default MeetupDetails
