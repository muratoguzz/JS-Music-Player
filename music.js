class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return this.title + " - " + this.singer;
    }
}


const musicList = [
    new Music("While My Guitar Gently Weeps", "Jeff Healey","1.jpeg","1.mp3"),    
    new Music("High Hopes", "Pink Floyd","2.jpeg","2.mp3"),    
    new Music("Always Somewhere", "Scorpions","3.jpeg","3.mp3"), 
    new Music("Knockin On Heaven's Door", "Guns N'Roses","4.jpeg","4.mp3") ,   
    new Music("Soldier Of Fortune", "Deep Purple","5.jpeg","5.mp3") ,   
    new Music("Imagine", "John Lennon","6.jpeg","6.mp3")   
];
