export const SUBJECT = (name: string): string => {
  return `Synapse - Email Confirmation`;
};

export const TEXT = (name: string, link: string): string => {
  const text: string = `
    Hi ${name},
    
     Your email was provided for the verification purpose in synapase.

     To complete the verification process please follow the link 
     
    [${link}]
    
    See you online!

    with best regards,
    Synapse Team
    `;

  return text;
};
