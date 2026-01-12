export const HTML = (senderName: string, link: string): string => {
  return `<div style="background-color: #0f172a; padding: 60px 10px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
        <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
            
            <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); padding: 4px;"></div>
            
            <div style="padding: 40px 40px 20px 40px; text-align: center;">

                <h1 style="color: #1e293b; font-size: 22px; font-weight: 800; letter-spacing: -0.025em; margin: 0;">Synapse: Your second brain</h1>
            </div>

            <div style="padding: 0 40px 40px 40px;">
                <p style="color: #475569; font-size: 15px; line-height: 24px; text-align: center;">
                    <span style="color: #1e293b; font-weight: 600;">${senderName}</span> , your email was provided for verification on Synapse.
                </p>

                <div style="border: 1px dashed #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 30px; background-color: #f8fafc;">
                    <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 18px;">
                        <strong>Note:</strong> please click the below button to verify the email and if it was not you, just ignore this letter 
                    </p>
                </div>

                <div style="text-align: center;">
                    <a href="${link}" style="background-color: #2563eb; color: #ffffff; padding: 18px 36px; border-radius: 10px; text-decoration: none; font-weight: 700; display: block; font-size: 16px; transition: all 0.2s; box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);">
                        Accept & Start Download
                    </a>
                </div>
            </div>

            <div style="padding: 24px; background-color: #f1f5f9; text-align: center;">
                <p style="color: #94a3b8; font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 0.05em;">
                    Synapse : Your second brain
                </p>
            </div>
        </div>
        
        <p style="text-align: center; color: #64748b; font-size: 12px; margin-top: 20px;">
            This is an automated security notification. Only click the link or file, you requested for.
        </p>
    </div>
`;
};
