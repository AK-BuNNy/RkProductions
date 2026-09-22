import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useScrollAnimation, buildWhatsAppUrl } from '../hooks/useAnimations';
import './ContactCTA.css';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type EnquiryForm = z.infer<typeof enquirySchema>;

const serviceOptions = [
  'Documentary Production',
  'Commercial Shoot',
  'Concert / Event Coverage',
  'Brand Experience',
  'Camera Gear Rental',
  'Full Production Package',
  'Other',
];

export default function ContactCTA() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryForm>({
    resolver: zodResolver(enquirySchema),
  });

  const onSubmit = (data: EnquiryForm) => {
    const message = `🎬 *New Enquiry — RK Production*

*Name:* ${data.name}
*Phone:* ${data.phone}
*Service:* ${data.service}

*Message:*
${data.message}

---
_Sent from rkproduction.in_`;

    window.open(buildWhatsAppUrl(message), '_blank');
    reset();
  };

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="container">
        <div className="contact__layout">
          <div className={`contact__info animate-on-scroll ${isVisible ? 'visible' : ''}`}>
            <p className="section-label">Get In Touch</p>
            <h2 className="section-title section-title--lg">
              Ready to Lock Your<br />
              Shoot Dates or<br />
              <span style={{ color: 'var(--accent-gold)' }}>Reserve Gear?</span>
            </h2>
            <p className="section-description" style={{ marginTop: '24px' }}>
              Send us your requirements and we'll get back to you within 2 hours.
              All enquiries go directly to our WhatsApp for the fastest response.
            </p>

            <div className="contact__features">
              <div className="contact__feature">
                <div className="contact__feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="contact__feature-title">Quick Response</p>
                  <p className="contact__feature-desc">Response within 2 hours on WhatsApp</p>
                </div>
              </div>
              <div className="contact__feature">
                <div className="contact__feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <p className="contact__feature-title">Flexible Scheduling</p>
                  <p className="contact__feature-desc">Available 7 days a week</p>
                </div>
              </div>
              <div className="contact__feature">
                <div className="contact__feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="contact__feature-title">Bangalore Based</p>
                  <p className="contact__feature-desc">Studio & on-location across Karnataka</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`contact__form-wrap animate-on-scroll delay-2 ${isVisible ? 'visible' : ''}`}>
            <form className="contact__form" onSubmit={handleSubmit(onSubmit)} id="enquiry-form">
              <h3 className="contact__form-title">Send Enquiry via WhatsApp</h3>

              <div className="contact__field">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  {...register('name')}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="contact__error">{errors.name.message}</span>}
              </div>

              <div className="contact__field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  {...register('phone')}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="contact__error">{errors.phone.message}</span>}
              </div>

              <div className="contact__field">
                <label htmlFor="service">Service Required</label>
                <select
                  id="service"
                  {...register('service')}
                  className={errors.service ? 'error' : ''}
                  defaultValue=""
                >
                  <option value="" disabled>Select a service</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.service && <span className="contact__error">{errors.service.message}</span>}
              </div>

              <div className="contact__field">
                <label htmlFor="message">Project Details</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your project, dates, and requirements..."
                  {...register('message')}
                  className={errors.message ? 'error' : ''}
                />
                {errors.message && <span className="contact__error">{errors.message.message}</span>}
              </div>

              <button type="submit" className="btn btn--primary contact__submit" id="submit-enquiry">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
