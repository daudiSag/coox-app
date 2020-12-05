import React from 'react';
import { ImArrowLeft2 } from 'react-icons/im';

function goBack() {

    if (window.history) {

        window.history.back();

    } else {
        window.location.assign('/');
    }

}

const TermsPage = () => {
    return (
        <div className="terms">
            <h3>
                <ImArrowLeft2 className="icon" onClick={goBack} />   Coox Privacy Policy
      </h3>
            <hr></hr>
            <p>
                Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand how we collect, use, communicate and disclose and make use of personal information. The following outlines our privacy policy.
      </p>

            <ul>
                <li>
                    Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.
          </li>
                <li>
                    We will collect and use of personal information solely with the objective of fulfilling those purposes specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned or as required by law.
          </li>
                <li>
                    We will only retain personal information as long as necessary for the fulfillment of those purposes.
          </li>
                <li>
                    We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.
          </li>
                <li>
                    Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.
          </li>
                <li>
                    We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.
          </li>
                <li>
                    We will make readily available to users information about our policies and practices relating to the management of personal information.
          </li>
                <li>
                    We will NEVER share users' personal information with any third party without express and documented permission granted by our users.
                    Any information shared will be an aggregate e.g trends and will not have any personal identifiable characteristics of our users.
          </li>
                <li>
                    We welcome any feedback from our users about our privacy policy, what we can improve on, and how we can better meet your privacy needs as you enjoy using our product.
          </li>
            </ul>

            <p>
                We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained.
      </p>

            <p>
                Thank You.
      </p>
            <p> <b>Coox Team</b></p>
        </div>

    );

}

export default TermsPage;