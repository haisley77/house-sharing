package com.tfeo.backend.domain.member.model.entity;

import static javax.persistence.CascadeType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.tfeo.backend.common.model.entity.MemberPersonality;
import com.tfeo.backend.common.model.type.Address;
import com.tfeo.backend.common.model.type.CertificateStatusType;
import com.tfeo.backend.common.model.type.GenderType;
import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.common.model.type.SocialType;
import com.tfeo.backend.domain.contract.model.entity.Contract;
import com.tfeo.backend.domain.member.model.dto.SurveyMemberRequestDto;
import com.tfeo.backend.domain.review.model.entity.Review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Builder
@AllArgsConstructor
@Table(name = "member")
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberNo;

	private String socialId;

	@Enumerated(value = EnumType.STRING)
	private SocialType socialType;

	private String name;

	private String phone;

	private String email;

	private String registerNo;

	private String college;

	private double lat; // 대학 위도

	private double lng; // 대학 경도

	@Embedded
	private Address address;

	private String profileUrl;

	@Enumerated(value = EnumType.STRING)
	private GenderType gender;

	@Enumerated(value = EnumType.STRING)
	private MemberRoleType role;

	private String certificate;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_personality_no")
	private MemberPersonality memberPersonality;

	@Enumerated(value = EnumType.STRING)
	private CertificateStatusType certificateStatus;

	private LocalDate certificateRegisterDate;

	private LocalDate certificateExpirationDate;

	private LocalTime sleepAt;

	private LocalTime wakeAt;

	private LocalTime returnAt;

	@OneToMany(mappedBy = "member", cascade = ALL)
	private List<Wish> wishes;

	@OneToMany(mappedBy = "member", cascade = ALL)
	private List<Contract> contracts;

	@OneToMany(mappedBy = "member", cascade = ALL)
	private List<Review> reviews;

	public void updateMemberPersonality(MemberPersonality memberPersonality) {
		this.memberPersonality = memberPersonality;
	}

	public void updateMemberSurvey(SurveyMemberRequestDto surveyMemberRequestDto) {
		this.college = surveyMemberRequestDto.getCollege();
		// college lat, lng 반영 필요
		this.wakeAt = surveyMemberRequestDto.getWakeAt();
		this.sleepAt = surveyMemberRequestDto.getSleepAt();
		this.returnAt = surveyMemberRequestDto.getReturnAt();
	}
}
