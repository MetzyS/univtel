let btnPrev = document.querySelector('#prev');
let btnNext = document.querySelector('#next');
let firstSlide = document.querySelector('.localisation-first');
let secondSlide = document.querySelector('.localisation-second');
let body = document.querySelector('body');

let btnContact = document.querySelector('.btn-contact');
let btnContactHeader = document.querySelector('.btn-contact-tab');

let msgOpenIcon = document.querySelector('.messages-open-icon');
let msgGrid = document.querySelector('.messages-grid');
let msgRow = document.querySelectorAll('.message-grid-row');
let msgContactMail = document.querySelectorAll('.contact-mail');

let subMenuBtn = document.querySelectorAll('.default-btn');


/* Conditions d'affichage du caroussel */
if (firstSlide) {
    window.addEventListener('load', function () {
        if (window.innerWidth > 650) {
            removeHideSlide(firstSlide);
            removeHideSlide(secondSlide);
        } else {
            addHideSlide(secondSlide);
        }
    })
}

if (firstSlide) {
    window.addEventListener('resize', (e) => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 650) {
            removeHideSlide(firstSlide);
            removeHideSlide(secondSlide);
        } else {
            addHideSlide(secondSlide);
        }
    })
}



/* Afficher/Masquer les Slides */
function toggleHideSlide(HTMLElement) {
    HTMLElement.classList.toggle('none');
}

function removeHideSlide(HTMLElement) {
    HTMLElement.classList.remove('none');
}

function addHideSlide(HTMLElement) {
    HTMLElement.classList.add('none');
}

if (btnPrev) {
    btnPrev.addEventListener('click', e => {
        toggleHideSlide(firstSlide);
        toggleHideSlide(secondSlide);
    })
}

if (btnNext) {
    btnNext.addEventListener('click', e => {
        toggleHideSlide(firstSlide);
        toggleHideSlide(secondSlide);
    })
}

/**
 * Requête AJAX pour récupérer infos message via ID
 * @param {string} pathUrl 
 * @param {string} method 
 * @returns {json}
 */
function messageFetch(pathUrl, method = 'GET') {
    return fetch(pathUrl, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })

        .then(function (data) {
            // Faire ce que l'on veut du JSON
            messageModal(data);
            // console.log(data);
        })

        .catch(function (err) {
            console.log(err);
        })
}


/**
 * Crée les élements HTML pour le formulaire de contact et les insère dans le DOM
 */
function createModal() {
    /* Création du formulaire de contact */
    let modalContainer = document.createElement('div');
    let modal = document.createElement('div');
    let modalBtnClose = document.createElement('button');
    let modalForm = document.createElement('form');
    let modalTitle = document.createElement('p');
    let modalLabelEmail = document.createElement('label');
    let modalInputEmail = document.createElement('input');
    let modalLabelSelect = document.createElement('label');
    let modalSelect = document.createElement('select');
    let modalFirstOption = document.createElement('option');
    let modalSecondOption = document.createElement('option');
    let modalThirdOpion = document.createElement('option');
    let modalLabelTextArea = document.createElement('label');
    let modalInputTextArea = document.createElement('textarea');
    let modalBtnWrapper = document.createElement('div');
    let modalBtnReset = document.createElement('input');
    let modalBtnSubmit = document.createElement('input');
    let modalConfidentialiteWrapper = document.createElement('div');
    let modalConfidentialiteLabel = document.createElement('label');
    let modalConfidentialiteInput = document.createElement('input');


    /* Ajout des styles et attributs modal */
    modalContainer.classList.add('modal-container');
    modal.classList.add('modal');
    modalBtnClose.classList.add('close-modal');
    modalForm.classList.add('form');
    modalBtnWrapper.classList.add('modal-wrapper')
    modalTitle.textContent = 'Formulaire de contact';
    // modalLabelName.classList.add('form-label')
    modalLabelEmail.classList.add('form-label')
    modalLabelSelect.classList.add('form-label')
    modalLabelTextArea.classList.add('form-label')
    modalConfidentialiteWrapper.classList.add('policy-wrapper');

    modalBtnClose.setAttribute('type', 'button');
    modalBtnClose.textContent = 'X';

    modalForm.setAttribute('method', 'POST');
    modalForm.setAttribute('action', '/www/univtel/app/views/home/processing/contact.php');

    modalLabelEmail.textContent = 'Votre adresse email';
    modalInputEmail.setAttribute('type', 'email');
    modalInputEmail.setAttribute('name', 'email');
    modalInputEmail.setAttribute('maxlength', '90');
    modalInputEmail.setAttribute('required', '');
    modalInputEmail.setAttribute('placeholder', 'exemple@mail.com');
    modalInputEmail.setAttribute('pattern', '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
    modalInputEmail.id = 'email';

    modalLabelSelect.textContent = 'Sujet de la demande';
    modalSelect.setAttribute('name', 'subject');
    modalSelect.id = 'subject';

    modalFirstOption.setAttribute('value', '1');
    modalFirstOption.textContent = 'Demande de devis';
    modalSecondOption.setAttribute('value', '2');
    modalSecondOption.textContent = "Demande d'informations";
    modalThirdOpion.setAttribute('value', '3');
    modalThirdOpion.textContent = 'Autre, précisez dans le message';

    modalLabelTextArea.textContent = 'Votre message';

    modalInputTextArea.setAttribute('name', 'message');
    modalInputTextArea.setAttribute('placeholder', 'Ecrivez votre message ici...');
    modalInputTextArea.setAttribute('cols', '10');
    modalInputTextArea.setAttribute('rows', '3');
    modalInputTextArea.setAttribute('maxlength', '500');
    modalInputTextArea.setAttribute('required', '');
    modalInputTextArea.id = 'message';

    modalBtnReset.setAttribute('type', 'reset');
    modalBtnReset.setAttribute('value', 'Effacer');
    modalBtnSubmit.setAttribute('type', 'submit');
    modalBtnSubmit.id = 'submit';
    modalBtnSubmit.setAttribute('value', 'Envoyer');
    modalBtnSubmit.setAttribute('disabled', '');

    modalConfidentialiteInput.setAttribute('type', 'checkbox');
    modalConfidentialiteInput.setAttribute('value', 'policy');
    modalConfidentialiteInput.setAttribute('name', 'policy');
    modalConfidentialiteInput.setAttribute('required', '');
    modalConfidentialiteLabel.classList.add('confidentialite-text');
    modalConfidentialiteLabel.textContent = "En soumettant ce formulaire, j'accepte que les informations saisies soient exploitées dans le cadre de la demande de contact et de la relation commerciale qui peut en découler.";


    /* Ajout 'for' label */
    // modalLabelName.htmlFor = 'name';
    modalLabelEmail.htmlFor = 'email';
    modalLabelSelect.htmlFor = 'subject';
    modalLabelTextArea.htmlFor = 'message';
    modalConfidentialiteLabel.htmlFor = 'policy';

    /* Insertion des élements */
    body.prepend(modalContainer);
    modalContainer.appendChild(modal);
    modal.append(modalBtnClose, modalForm);
    modalConfidentialiteWrapper.append(modalConfidentialiteInput, modalConfidentialiteLabel);
    // modalForm.append(modalTitle, modalLabelName, modalInputName, modalLabelEmail, modalInputEmail, modalLabelSelect, modalSelect, modalLabelTextArea, modalInputTextArea, modalBtnWrapper);
    modalForm.append(modalTitle, modalLabelEmail, modalInputEmail, modalLabelSelect, modalSelect, modalLabelTextArea, modalInputTextArea, modalConfidentialiteWrapper, modalBtnWrapper);
    modalSelect.append(modalFirstOption, modalSecondOption, modalThirdOpion);
    modalBtnWrapper.append(modalBtnReset, modalBtnSubmit);

    modalBtnClose.addEventListener('click', e => {
        modalContainer.remove();
    })

    modalInputEmail.addEventListener('input', e => {
        let submitBtn = document.querySelector('#submit');
        if (modalInputEmail.value.match(/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,5})$/)) {
            modalInputEmail.classList.remove('input-error');
            submitBtn.disabled = false;
        } else {
            modalInputEmail.classList.add('input-error');
            submitBtn.disabled = true;
        }
    })
}

function createSubMenu(id, HTMLElement) {
    // Création des élements
    let subMenuContainer = document.createElement('div');
    let subMenuList = document.createElement('ul');
    let subMenuItemRead = document.createElement('li');
    let subMenuItemUnread = document.createElement('li');
    let subMenuItemOk = document.createElement('li');
    let subMenuItemDelete = document.createElement('li');
    let subMenuLinkRead = document.createElement('a');
    let subMenuLinkUnread = document.createElement('a');
    let subMenuLinkOk = document.createElement('a');
    let subMenuBtnDelete = document.createElement('button');
    // let subMenuLinkDelete = document.createElement('a');
    let subMenuSpanRead = document.createElement('span');
    let subMenuSpanUnread = document.createElement('span');
    let subMenuSpanOk = document.createElement('span');
    let subMenuItemIconRead = document.createElement('span');
    let subMenuItemIconUnread = document.createElement('span');
    let subMenuItemIconOk = document.createElement('span');
    let subMenuSpanDelete = document.createElement('span');
    let deleteModal = document.createElement('div');
    let deleteModalMessage = document.createElement('p');
    let deleteModalBtnWrapper = document.createElement('div');
    let deleteModalLink = document.createElement('a');
    let deleteModalClose = document.createElement('button');


    // Ajout des attributs et styles
    subMenuLinkRead.setAttribute('href', '/www/univtel/message/changeStatus/' + id + '/read');
    subMenuLinkRead.id = 'read-' + id;
    subMenuLinkUnread.setAttribute('href', '/www/univtel/message/changeStatus/' + id + '/unread');
    subMenuLinkUnread.id = 'unread-' + id;
    subMenuLinkOk.setAttribute('href', '/www/univtel/message/changeStatus/' + id + '/answered');
    subMenuLinkOk.id = 'ok-' + id;
    subMenuBtnDelete.setAttribute('type', 'button');
    deleteModalLink.setAttribute('href', '/www/univtel/message/deleteMessage/' + id);
    subMenuBtnDelete.id = 'delete-' + id;

    subMenuItemRead.classList.add('submenu-item');
    subMenuItemUnread.classList.add('submenu-item');
    subMenuItemOk.classList.add('submenu-item');
    subMenuContainer.classList.add('submenu');
    subMenuList.classList.add('submenu-list');
    subMenuItemIconRead.classList.add('read');
    subMenuItemIconUnread.classList.add('unread');
    subMenuItemIconOk.classList.add('answered');
    subMenuBtnDelete.classList.add('delete-btn');
    subMenuItemDelete.classList.add('submenu-delete');
    subMenuSpanDelete.classList.add('delete');
    deleteModal.classList.add('delete-modal');
    deleteModal.classList.add('focus');
    deleteModalMessage.classList.add('delete-modal-text');
    deleteModalBtnWrapper.classList.add('delete-btn-wrapper');
    deleteModalClose.classList.add('btn-close-delete');
    deleteModalLink.classList.add('btn-confirm-delete');


    subMenuSpanRead.textContent = 'Lu';
    subMenuSpanUnread.textContent = 'Non lu';
    subMenuSpanOk.textContent = 'Traîté';
    subMenuSpanDelete.textContent = 'Supprimer';
    deleteModalMessage.textContent = 'Voulez-vous vraiment supprimer ce message ?'
    deleteModalLink.textContent = 'Oui';
    deleteModalClose.textContent = 'Non';


    // Positionnement dans le DOM
    subMenuContainer.appendChild(subMenuList);

    subMenuList.append(subMenuItemRead, subMenuItemUnread, subMenuItemOk, subMenuItemDelete);

    subMenuItemRead.appendChild(subMenuLinkRead);
    subMenuLinkRead.append(subMenuSpanRead, subMenuItemIconRead);

    subMenuItemUnread.appendChild(subMenuLinkUnread);
    subMenuLinkUnread.append(subMenuSpanUnread, subMenuItemIconUnread);

    subMenuItemOk.appendChild(subMenuLinkOk);
    subMenuLinkOk.append(subMenuSpanOk, subMenuItemIconOk);

    subMenuItemDelete.appendChild(subMenuBtnDelete);
    subMenuBtnDelete.appendChild(subMenuSpanDelete);

    deleteModal.append(deleteModalMessage, deleteModalBtnWrapper);
    deleteModalBtnWrapper.append(deleteModalLink, deleteModalClose);

    // EventListener confirmation suppression
    subMenuItemDelete.addEventListener('click', e => {
        let section = document.querySelector('section');
        let header = document.querySelector('header');
        let footer = document.querySelector('footer');
        section.classList.add('blur');
        header.classList.add('blur');
        footer.classList.add('blur');
        document.body.insertBefore(deleteModal, document.body.firstChild);

        deleteModalClose.addEventListener('click', e => {
            deleteModal.remove();
            section.classList.remove('blur');
            header.classList.remove('blur');
            footer.classList.remove('blur');
        })
    })

    HTMLElement.append(subMenuContainer);
}


function messageModal(msgJson) {
    let modal = document.createElement('div');

    let msgSender = document.createElement('div');
    let msgSenderTitle = document.createElement('span');
    let msgSenderMail = document.createElement('span');

    let msgDate = document.createElement('div');
    let msgDateTitle = document.createElement('span');
    let msgDateTime = document.createElement('span');

    let msgSubject = document.createElement('div');
    let msgSubjectTitle = document.createElement('span');
    let msgSubjectText = document.createElement('span');

    let msgContent = document.createElement('p');
    let msgClose = document.createElement('button');

    modal.classList.add('test');
    modal.classList.add('margin');

    msgClose.textContent = 'X';
    msgClose.classList.add('close-msg');

    msgClose.addEventListener('click', e => {
        msgClose.parentNode.remove();
        sectionMessage.classList.toggle('none')
    })

    // body.append(modal);
    let footer = document.querySelector('footer');
    let sectionMessage = document.querySelector('.messages');
    sectionMessage.classList.toggle('none');
    body.insertBefore(modal, footer);

    msgSender.classList.add('detail-grid');
    msgSender.append(msgSenderTitle, msgSenderMail);

    msgDate.classList.add('detail-grid');
    msgDate.append(msgDateTitle, msgDateTime);

    msgSubject.classList.add('detail-grid');
    msgSubject.append(msgSubjectTitle, msgSubjectText);

    msgSenderTitle.classList.add('detail-title');
    msgSenderTitle.textContent = 'Email: ';
    msgSenderMail.textContent = JSON.stringify(msgJson['mail']);

    msgDateTitle.classList.add('detail-title');
    msgDateTitle.textContent = 'Date: ';
    msgDateTime.textContent = JSON.stringify(msgJson['sent_at']);

    msgSubjectTitle.classList.add('detail-title');
    msgSubjectTitle.textContent = 'Sujet: ';
    msgSubjectText.textContent = JSON.stringify(msgJson['subject']);
    msgContent.textContent = decodeURIComponent(JSON.stringify(msgJson['message']));

    modal.append(msgClose, msgSender, msgDate, msgSubject, msgContent);
}


/* Event Listener => boutons contact (page d'accueil) */
if (btnContact) {
    btnContact.addEventListener('click', e => {
        createModal();
    })
}
if (btnContactHeader) {
    btnContactHeader.addEventListener('click', e => {
        createModal();
    })
}

/* Event Listener => dérouler la liste des messages (page messages) */
if (msgOpenIcon) {
    msgOpenIcon.addEventListener('click', e => {
        msgOpenIcon.classList.toggle('icon-rotate');
        msgGrid.classList.toggle('none');
    })
}

/* Event Listener => menu message (lu, non lu, supprimer..) */
if (subMenuBtn) {
    subMenuBtn.forEach((element, index) => {
        let btn = subMenuBtn[index];
        messageId = btn.parentElement.id.replace(/\D/g, "");
        btn.id = messageId;
        btn.addEventListener('click', e => {
            let subMenu = document.querySelectorAll('.submenu');
            if (subMenu) {
                for (let x = 0; x < subMenu.length; x++) {
                    subMenu[x].remove();
                }
            }
            createSubMenu(btn.id, btn.parentElement);
        })
    });
    document.addEventListener('click', e => {
        let isInArray = false;
        for (let i = 0; i < subMenuBtn.length; i++) {
            if (subMenuBtn[i] == e.target) {
                isInArray = true;
                break;
            }
        }
        if (!isInArray) {
            let subMenu = document.querySelectorAll('.submenu');
            if (subMenu) {
                for (let x = 0; x < subMenu.length; x++) {
                    subMenu[x].remove();
                }
            }
        }
    })
}

if (msgContactMail) {
    msgContactMail.forEach(element => {
        element.addEventListener('click', e => {
            let msgId = element.parentElement.id.replace('message-', '');
            messageFetch('http://localhost/www/univtel/app/views/message/processing/message.php?id=' + msgId);
        })
    })
}
