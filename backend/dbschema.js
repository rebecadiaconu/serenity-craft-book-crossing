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
            mainInterests: ['drama', 'adventure'],
            reportCount: 0,
            favs: [''],
            banned: false,
            bannedAt: ''
        }
    ],
    books: [
        {
            bookId: '',
            createdAt: '2021-04-21T15:38:46.994Z',
            available: true,
            crossingId: '',
            title: '',
            author: '',
            publisher: '',
            numPages: 200,
            genres: [''],
            language: '',
            bookQuality: '',
            owner: '',
            ownerImage: '',
            publicationYear: 1998,
            summary: '',
            ownerRating: '',
            ownerReview: '',
            numExchanges: 3,
            numReviews: 1,
            coverImageUrl: '',
            averageRating: 4
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
            rating: 4
        }
    ],
    notifications: [
        {
            notificationId: '',
            createdAt: '2021-04-21T15:38:46.994Z',
            recipient: '',
            sender: '',
            type: ' info | review | topic | reply | accept-request | cancel-request ',
            read: false,
            bookId: '',     // optional
            topicId: '',        // optional
            crossingId: '',     // optional
            message: '',        // optional
            senderImage: ''        
        }
    ],
    crossings: [
        {
            crossingId: '',
            type: 'permanent | temporar ',
            createdAt: '2021-04-21T15:38:46.994Z',
            recipient: '',
            recipientProgress: {
                sendBook: false,
                receiveBook: false,
                sendBack: false,
                getBookBack: false
            },
            recipientData: {
                userImage: '',
                show: true
            },
            recipientPermanent: false,
            sender: '',
            senderProgress: {
                sendBook: false,
                receiveBook: false,
                sendBack: false,
                getBookBack: false
            },
            senderData: {
                userImage: '',
                show: true
            },
            senderPermanent: false,
            reqBookId: '',
            reqBook: {     // sender book
                title: '',
                author: '',
                coverImage: '',
                averageRating: 4
            },
            randomBookId: '',
            randomBook: {       // recipient book
                title: '',
                author: '',
                coverImage: '',
                averageRating: 4
            },
            status: 'pending | accepted | book-send | start-reading | send-back | done',
            canceled: false,
            canceledBy: 'username',     // only if canceled = true
        }
    ],
    topics: [
        {
            topicId: '',
            createdAt: '2021-04-21T15:38:46.994Z',
            crossingId: '',
            username: '',
            userImage: '',
            title: '',
            body: '',
            replyCount: 0,
            replies: []
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
    ],
    reports: [
        {
            reportId: '',
            createdAt: '2021-04-21T15:38:46.994Z',
            recipient: '',
            recipientImage: '',
            sender: '',
            senderImage: '',
            senderEmail: '',
            reason: '',
            type: '', // book | review | crossing | topic | reply | other
            status: '', //  unseen | accepted | rejected | stand-by
            seen: false,
            book: '',   // optional
            topic: '',  // optional
            replyId: '', // optional
            crossing: '' // ???? optional
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
    ]
};