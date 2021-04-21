let db = {
    users: [
        {
            userId: 'xJa81fPcwpb2gwJvU4yMfnoaqHd2',
            username: 'user',
            email: 'user@gmail.com',
            createdAt: '2021-04-21T15:38:46.994Z',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/serenity-craft-liceapp.appspot.com/o/801362089613.jpg?alt=media',
            reportCount: 0,
            bio: 'Hi there, my name is Mark!',
            location: 'London, UK',
            mainInterests: ['drama', 'adventure']
        }
    ],
    books: [
        {
            bookId: '',
            createdAt: '2021-04-21T15:38:46.994Z',
            available: true,
            title: '',
            author: '',
            publisher: '',
            numPages: 200,
            genre: '',
            bookType: '',
            language: '',
            owner: '',
            ownerImage: '',
            publicationYear: 1998,
            summary: '',
            averateRating: '',
            numExchanges: 3,
            coverImageUrl: '',
            bookImages: ['imageUrl array'],
            inAuction: false,
            auctionId: ''
        }
    ],
    auctions:[
        {
            auctionId: '',
            cratedAt: '2021-04-21T15:38:46.994Z',
            closed: true,
            endAt: '',
            books: ['books id'],
            owner: '',
            ownerImage: '',
            description: '',
            exchangeType: 'permanent'
        }
    ],
    offers: [
        {
            offerId: '',
            createdAt: '2021-04-21T15:38:46.994Z',
            auctionId: '',
            body: '',
            chosen: false,
            username: '',
            userImage: '',
            books: ['books id']
        }
    ],
    reports: [
        {
            reportId: '',
            createdAt: '2021-04-21T15:38:46.994Z',
            recipient: '',
            sender: '',
            body: ''
        }
    ],
    reviews: [
        {
            reviewId: '',
            createdAt: '2021-04-21T15:38:46.994Z',
            bookId: '',
            username: '',
            userImage: '',
            body: '',
            bookRate: 4
            // bookOwner: '' ????

        }
    ],
    notifications: [
        {
            notificationId: '',
            createdAt: '2021-04-21T15:38:46.994Z',
            recipient: '',
            sender: '',
            type: 'offer | review | auction | exchange | topic',
            read: false,
            contentId: '',
            senderImage: '' 
        }
    ],
    exchanges: [
        {
            exchangeId: '',
            type: 'permanent | temporar',
            createdAt: '2021-04-21T15:38:46.994Z',
            recipient: '',
            sender: '',
            recipientBook: '',
            senderBook: '',
            state: 'pending request | in progress | done',
            senderImage: '' ,
            recipientImage: '' 
        }
    ],
    topics: [
        {
            topicId: '',
            createdAt: '2021-04-21T15:38:46.994Z',
            exchangeId: '',
            username: '',
            userImage: '',
            body: '',
            replyCount: 0
        }
    ],
    replies: [
        {
            replyId: '',
            createdAt: '2021-04-21T15:38:46.994Z',
            topicId: '',
            body: '',
            username: '',
            userImage: ''
        }
    ]
};