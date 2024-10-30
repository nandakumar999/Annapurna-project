package com.e_commerce.sb.entity;

import java.util.Arrays;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Corousel")
public class Corousel {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long corouselId;
	
	@Column(name="corouselImg")
	private byte[] corouselImg;

	public Corousel() {
		super();
	}
	
	

	public Corousel(byte[] corouselImg) {
		super();
		this.corouselImg = corouselImg;
	}



	public Corousel(Long corouselId, byte[] corouselImg) {
		super();
		this.corouselId = corouselId;
		this.corouselImg = corouselImg;
	}

	public Long getCorouselId() {
		return corouselId;
	}

	public void setCorouselId(Long corouselId) {
		this.corouselId = corouselId;
	}

	public byte[] getCorouselImg() {
		return corouselImg;
	}

	public void setCorouselImg(byte[] corouselImg) {
		this.corouselImg = corouselImg;
	}

	@Override
	public String toString() {
		return "Corousel [corouselId=" + corouselId + ", corouselImg=" + Arrays.toString(corouselImg) + "]";
	}
	
}
