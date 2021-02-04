export default Object.freeze({
    patchSchema: 'urn:ietf:params:scim:api:messages:2.0:PatchOp',
    addOp: 'add',
    removeOp: 'remove',
    userPresenceMethodPath:
        'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:userPresenceMethods',
    fingerprintMethodPath:
        'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:fingerprintMethods',
    getAccountRemovePath: (authenticatorId) =>
        `urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:authenticators[id.eq.uuid${authenticatorId}]`,
});
