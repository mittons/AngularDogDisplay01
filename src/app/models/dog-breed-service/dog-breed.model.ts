export class DogBreed {
    constructor(
      public id: number,
      public name: string,
      public weight: string,
      public height: string,
      public lifeSpan: string,
      public referenceImageId: string,
      public temperament?: string,
      public bredFor?: string,
      public breedGroup?: string
    ) {}
  
    static fromJson(json: any): DogBreed {
      return new DogBreed(
        json['id'],
        json['name'],
        json['weight']['metric'],
        json['height']['metric'],
        json['life_span'],
        json['reference_image_id'],
        json['temperament'],
        json['bred_for'],
        json['breed_group']
      );
    }
  }