# AngularDogDisplay01
# About Project
Re-iteration of practice projects:
 - [DoggoDec19](https://github.com/mittons/doggoDec19) - Practice project from Dec 19 2023
 - [DoggoDec18](https://github.com/mittons/doggoDec18) - Practice project from Dec 18 2023
 - [DoggoDec17](https://github.com/mittons/doggoDec17) - Practice project from Dec 17 2023
 - [DoggoDec16](https://github.com/mittons/doggoDec16) - Practice project from Dec 16 2023
 - [DoggoDisplay01](https://github.com/mittons/doggoDisplay01) - Practice project from Dec 09 2023 to Dec 13 2023

Similar to the majority of the previous projects that this project is based on, AngularDogDisplay01 is a project I made with the intention of personal skill consolidation/refining, as well as a career portfolio project.

But at the same time this is also my first experience with Angular. Heavily based on the same functionality/patterns as the previous iterations (only a few discrepancies), but in a new language, so beyond simple skill consolidation/refining, this was also a massive learning experience.

Uses data from [TheDogApi.com](https://thedogapi.com/).

This app can be previewed/tested at the [GitHub Pages extension for this repository](https://mittons.github.io/AngularDogDisplay01/).

## Reflections:
A great learning experience. I still need to work and practice on getting proper auto-documentation into my code like I mentioned in [DoggoDisplay01 README](https://github.com/mittons/doggoDisplay01#reflections). And consider logging/observation strategies for error reporting client side apps.

## Notable (Milestone) Resources Created:
- My first Angular application!
    - (*The rest of this [README Milestone section](#notable-milestone-resources-creatednotable) is just a modified version of the same section from the: [DoggoDisplay01 README milestone section](https://github.com/mittons/doggoDisplay01#notable-milestone-resources-created)*)
- Angular app with a:
  - Presentation layer ~ Displays a list of items on command
  - Service layer ~ Fetches list of items from REST api
- Error handling
  - Presentation layer ~ Displays snackbar if Service layer is not successful
  - Service layer ~ Is responsible for the details of data access, abstracts complexity of error handling away from the user facing presentation layer code
- Unit tests
  - Presentation layer ~ Widget testing using injection of a mock version of the service layer
    - Tests for expected elements in initial state
    - Tests for expected results of stage changes
        - Successful operations (Interface/environtment changes)
        - Unsuccessful operations (Error messages)
  - Service layer ~ Unit testing using injection of a mock http client
    - Results of successful operations
    - Handling of unsuccesful operations
- Integration/e2e tests
  - Presentation and Service layers tested at the same time using a injected mock http client for external data dependency
    - Tests for expected elements in initial state
    - Tests for expected results of stage changes
        - Successful operations (Interface/environtment changes)
        - Unsuccessful operations (Error messages)
- CI/CD script ~ GitHub Actions Script running on ubuntu-latest
  - Checks out repository code
  - Sets up Node, Angular and project dependencies
  - Runs all tests ~ unit and integration
  - Builds application
  - Deploys application to GitHub Pages
- README.me suited for skill consolidation/validation projects

## Acknowledgements
- **The Dog API:** This application uses data from [The Dog API](https://www.thedogapi.com). I route the traffic through my own private backend proxy in order to secure my user key for the API, in line with the [The Dog API TOS](https://thedogapi.com/terms).

- **ChatGPT:** Powered by OpenAI, specifically ChatGPT-4. Files in this project vary from between being Content that is completely AI generated to being completely human-generated. The term Content, and other relevant definitions, can be observed on [The OpenAI TOS page](https://openai.com/policies/terms-of-use#using-our-services).

## License
This project is licensed under the [MIT LICENSE](LICENSE) - see the file for details.

While my project incorporates the work of others through third-party dependencies, I have not included a detailed `THIRD_PARTY_LICENSES` file at this time. I am deeply committed to respecting intellectual property, honoring the licensing requirements of all dependencies, and declaring an express desire to acknowledge all contributions while repsecting, and not limiting, those who choose not to be acknowledged.

Should you have any inquiries or suggestions regarding third-party attributions, or if there's a specific attribution you believe requires immediate attention, please do not hesitate to contact me at axel@axelgauti.is. I promise to address all such communications promptly, providing either a resolution or a commitment to resolve the matter within a reasonable timeframe, subject to my availability and capacity to respond.

This commitment is part of my broader ethical stance on promoting attribution transparently and fairly, without prejudging the worth of contributions based on past or potential acknowledgments. I welcome your feedback and suggestions on how I can improve my practices in this area.