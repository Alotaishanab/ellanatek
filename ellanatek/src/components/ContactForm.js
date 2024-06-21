import React, { useState } from 'react';
import styled from 'styled-components';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const ContactSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #000;
  color: #fff;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const AnimationContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  height: 100%;
  background-color: #111;
`;

const CompanyEmail = styled.p`
  font-size: 1.2rem;
  color: #bbb;
  margin-top: 2rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: #8a4fff;
  font-size: 2rem;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  background: #222;
  padding: 3rem;
  border-radius: 15px 0 0 15px;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.1);
  color: #fff;
  max-width: 400px; /* Adjusted max-width for the form container */
  height: 80%; /* Adjusted height for better vertical alignment */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto; /* Center vertically */

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 2rem;
    padding: 2rem;
    border-radius: 15px;
  }
`;

const FormTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const FormDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #bbb;
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #444;
  font-size: 1.5rem;
  padding: 0.5rem 0;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: #8a4fff;
  }
`;

const InputLabel = styled.label`
  flex: 1;
  color: #fff;
  font-size: 1.5rem;
`;

const Input = styled.input`
  flex: 2;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 1.5rem;
  padding: 0.5rem;

  &::placeholder {
    color: #777;
  }
`;

const TextareaWrapper = styled.div`
  border-bottom: 1px solid #444;
  padding: 0.5rem 0;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: #8a4fff;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 1.5rem;
  padding: 0.5rem;
  resize: none;

  &::placeholder {
    color: #777;
  }
`;

const Button = styled.button`
  margin-top: 2rem;
  padding: 1rem 2rem;
  background-color: #8a4fff;
  border: none;
  border-radius: 50px;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #6933b9;
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(0);
  }
`;



const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyname: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5004/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      alert('Error sending message');
    }
  };

  return (
    <ContactSection>
      <AnimationContainer>
        {/* Add your SVG or CSS animation here */}
        <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L15.09 7.36L23 8.64L17 14.57L18.18 22.63L12 19.25L5.82 22.63L7 14.57L1 8.64L8.91 7.36L12 0Z" fill="#8a4fff"/>
        </svg>
        <CompanyEmail>info@ellanatek.com</CompanyEmail>
        <SocialIcons>
          <SocialIcon href="https://instagram.com" target="_blank"><FaInstagram /></SocialIcon>
          <SocialIcon href="https://linkedin.com" target="_blank"><FaLinkedin /></SocialIcon>
          <SocialIcon href="https://twitter.com" target="_blank"><FaTwitter /></SocialIcon>
        </SocialIcons>
      </AnimationContainer>
      <FormContainer>
        <FormTitle>Hello </FormTitle>
        <FormDescription>Let's start a conversation! Fill out our contact form, and we'll get back to you as soon as possible.</FormDescription>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <InputLabel htmlFor="name">My name is</InputLabel>
            <Input id="name" name="name" placeholder="Enter your name" type="text" value={formData.name} onChange={handleChange} required />
          </InputWrapper>
          <InputWrapper>
            <InputLabel htmlFor="companyname">I'm from</InputLabel>
            <Input id="companyname" name="companyname" placeholder="Enter your company name" type="text" value={formData.companyname} onChange={handleChange} required />
          </InputWrapper>
          <InputWrapper>
            <InputLabel htmlFor="email">Here is my email</InputLabel>
            <Input id="email" name="email" placeholder="Enter your email" type="email" value={formData.email} onChange={handleChange} required />
          </InputWrapper>
          <TextareaWrapper>
            <Textarea id="message" name="message" placeholder="Enter your message" value={formData.message} onChange={handleChange} required></Textarea>
          </TextareaWrapper>
          <Button type="submit">Submit</Button>
        </Form>
      </FormContainer>
    </ContactSection>
  );
};



export default ContactForm;
