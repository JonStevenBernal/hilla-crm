import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from '../../views/view';
import { crmStore } from 'Frontend/stores/app-store';
import '@vaadin/notification';
import { uiStore } from 'Frontend/stores/app-store';

import '@vaadin/text-field';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column';
import './contact-form';
import persons from './persons';
import { listViewStore } from 'Frontend/views/list/list-view-store';

@customElement('list-view')
export class ListView extends View {
  render() {
    return html`
      <div class="toolbar flex gap-s">
        <vaadin-text-field
          placeholder="Filter by name"
          .value=${listViewStore.filterText}
          @input=${this.updateFilter}
          clear-button-visible
        >
        </vaadin-text-field>
        <vaadin-button @click=${listViewStore.editNew}>Add Contact</vaadin-button>
      </div>
      <div class="content flex gap-m h-full">
        <vaadin-grid
          class="grid h-full"
          .items=${listViewStore.filteredContacts}
          .selectedItems=${[listViewStore.selectedContact]}
          @active-item-changed=${this.handleGridSelection}
        >
          <vaadin-grid-column path="firstName" auto-width> </vaadin-grid-column>
          <vaadin-grid-column path="lastName" auto-width> </vaadin-grid-column>
          <vaadin-grid-column path="email" auto-width> </vaadin-grid-column>
          <vaadin-grid-column path="status.name" header="Status" auto-width></vaadin-grid-column>
          <vaadin-grid-column path="company.name" header="Company" auto-width></vaadin-grid-column>
        </vaadin-grid>
        <!-- <vaadin-grid class="grid h-full" .items=${crmStore.contacts}></vaadin-grid> -->
        <contact-form class="flex flex-col gap-s" ?hidden=${!listViewStore.selectedContact}></contact-form>
      </div>
      <vaadin-grid class="grid h-full" .items=${persons}>
        <vaadin-grid-column path="firstName" header="First Name"></vaadin-grid-column>
        <vaadin-grid-column path="lastName" header="Last Name"></vaadin-grid-column>
        <vaadin-grid-column path="email" header="Email"></vaadin-grid-column>
      </vaadin-grid>
      <vaadin-notification
        theme=${uiStore.message.error ? 'error' : 'contrast'}
        position="bottom-start"
        .opened=${uiStore.message.open}
        .renderer=${(root: HTMLElement) => (root.textContent = uiStore.message.text)}
      >
      </vaadin-notification>
    `;
  }

  updateFilter(e: { target: HTMLInputElement }) {
    listViewStore.updateFilter(e.target.value);
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('box-border', 'flex', 'flex-col', 'p-m', 'gap-s', 'w-full', 'h-full');

    this.autorun(() => {
      if (listViewStore.selectedContact) {
        this.classList.add('editing');
      } else {
        this.classList.remove('editing');
      }
    });
  }

  // vaadin-grid fires a null-event when initialized. Ignore it.
  firstSelectionEvent = true;
  handleGridSelection(e: CustomEvent) {
    if (this.firstSelectionEvent) {
      this.firstSelectionEvent = false;
      return;
    }
    listViewStore.setSelectedContact(e.detail.value);
  }
}
