let btnPrev = document.querySelector('#prev');
let btnNext = document.querySelector('#next');
let firstSlide = document.querySelector('.localisation-first');
let secondSlide = document.querySelector('.localisation-second');
let body = document.querySelector('body');

let btnContact = document.querySelector('.btn-contact');
let btnContactHeader = document.querySelector('.btn-contact-tab');

let msgOpenIcon = document.querySelector('.messages-open-icon');
let msgGrid = document.querySelector('.messages-grid');

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
            console.log('ok');
        } else {
            modalInputEmail.classList.add('input-error');
            submitBtn.disabled = true;
            console.log('not ok');
        }
    })

}

function createSubMenu(id, HTMLElement) {
    let subMenuContainer = document.createElement('div');
    let subMenuList = document.createElement('ul');
    let subMenuItemRead = document.createElement('li');
    let subMenuItemUnread = document.createElement('li');
    let subMenuItemOk = document.createElement('li');
    let subMenuLinkRead = document.createElement('a');
    let subMenuLinkUnread = document.createElement('a');
    let subMenuLinkOk = document.createElement('a');
    let subMenuSpanRead = document.createElement('span');
    let subMenuSpanUnread = document.createElement('span');
    let subMenuSpanOk = document.createElement('span');
    let subMenuItemIconRead = document.createElement('span');
    let subMenuItemIconUnread = document.createElement('span');
    let subMenuItemIconOk = document.createElement('span');
    subMenuLinkRead.id = 'read-' + id;
    subMenuLinkRead.setAttribute('href', '/www/univtel/message/changeStatus/' + id + '/read');
    subMenuLinkUnread.id = 'unread-' + id;
    subMenuLinkUnread.setAttribute('href', '/www/univtel/message/changeStatus/' + id + '/unread');
    subMenuLinkOk.id = 'ok-' + id;
    subMenuLinkOk.setAttribute('href', '/www/univtel/message/changeStatus/' + id + '/answered');
    subMenuContainer.classList.add('submenu');
    subMenuList.classList.add('submenu-list');
    subMenuItemIconRead.classList.add('read');
    subMenuItemIconUnread.classList.add('unread');
    subMenuItemIconOk.classList.add('answered');
    subMenuSpanRead.textContent = 'Lu';
    subMenuSpanUnread.textContent = 'Non lu';
    subMenuSpanOk.textContent = 'Traîté';


    subMenuContainer.appendChild(subMenuList);

    subMenuList.append(subMenuItemRead, subMenuItemUnread, subMenuItemOk);

    subMenuItemRead.appendChild(subMenuLinkRead);
    subMenuLinkRead.append(subMenuSpanRead, subMenuItemIconRead);

    subMenuItemUnread.appendChild(subMenuLinkUnread);
    subMenuLinkUnread.append(subMenuSpanUnread, subMenuItemIconUnread);

    subMenuItemOk.appendChild(subMenuLinkOk);
    subMenuLinkOk.append(subMenuSpanOk, subMenuItemIconOk);

    HTMLElement.append(subMenuContainer);
}

/* Event Listener boutons contact */
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

if (msgOpenIcon) {
    msgOpenIcon.addEventListener('click', e => {
        msgOpenIcon.classList.toggle('icon-rotate');
        msgGrid.classList.toggle('none');
    })
}

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