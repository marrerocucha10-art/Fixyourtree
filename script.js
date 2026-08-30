let familyMembers = JSON.parse(localStorage.getItem('familyMembers')) || [];
const familyForm = document.getElementById('familyForm');
const nameInput = document.getElementById('name');
const relationInput = document.getElementById('relation');
const birthYearInput = document.getElementById('birthYear');
const familyTreeDiv = document.getElementById('familyTree');
const memberCount = document.getElementById('memberCount');

familyForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const member = { id: Date.now(), name: nameInput.value.trim(), relation: relationInput.value, birthYear: birthYearInput.value };
  if (!member.name || !member.relation) return;
  familyMembers.push(member);
  saveFamilyMembers();
  renderFamilyTree();
  familyForm.reset();
  nameInput.focus();
});

function saveFamilyMembers() { localStorage.setItem('familyMembers', JSON.stringify(familyMembers)); }
function initials(name) { return name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase(); }
function escapeHtml(text) { return text.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]); }
function renderFamilyTree() {
  memberCount.textContent = `${familyMembers.length} ${familyMembers.length === 1 ? 'person' : 'people'}`;
  if (!familyMembers.length) {
    familyTreeDiv.innerHTML = '<div class="empty-state"><div class="empty-tree">⌁</div><h4>Your story starts here</h4><p>Add your first family member to begin building your tree.</p></div>';
    return;
  }
  familyTreeDiv.innerHTML = familyMembers.map((member) => `<article class="family-member"><span class="member-avatar">${initials(member.name)}</span><div class="member-info"><h4>${escapeHtml(member.name)}</h4><p>${escapeHtml(member.relation)}${member.birthYear ? ` <span>·</span> Born ${member.birthYear}` : ''}</p></div><button class="remove-button" type="button" aria-label="Remove ${escapeHtml(member.name)}" onclick="removeMember(${member.id})">×</button></article>`).join('');
}
function removeMember(id) { familyMembers = familyMembers.filter((member) => member.id !== id); saveFamilyMembers(); renderFamilyTree(); }
renderFamilyTree();
